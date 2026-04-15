import { renderToStaticMarkup } from 'react-dom/server';
import JSZip from 'jszip';
import { WebsiteProject, WebsitePage } from '@/contexts/ProjectContext';
import { WebsiteTemplate } from '@/templates/TemplateSystem';

export const buildStaticSiteZip = async (project: WebsiteProject): Promise<Blob> => {
  const zip = new JSZip();

  if (!project.pages || project.pages.length === 0) {
    throw new Error('Project has no pages to deploy.');
  }

  // Iterate over each page to create its HTML file
  for (const page of project.pages) {
    // We generate a valid filename. E.g. "/" -> "index.html", "/about" -> "about.html"
    let filename = page.path === '/' ? 'index.html' : `${page.path.startsWith('/') ? page.path.slice(1) : page.path}.html`;
    if (!filename.endsWith('.html')) filename += '.html';

    // We render the component tree to raw HTML
    const componentHtml = renderToStaticMarkup(
      <WebsiteTemplate
        type={project.type}
        templateIndex={project.template || 0}
        content={page.content || {}}
        name={project.name || 'My Website'}
        logo={project.logo}
        pages={project.pages}
      />
    );

    // Provide the navigation interceptor to map span clicks to .html files
    // The Template components render pages via span elements containing the `p.name`.
    const navigationMap = project.pages.map(p => ({
      name: p.name,
      filename: p.path === '/' ? 'index.html' : `${p.path.startsWith('/') ? p.path.slice(1) : p.path}.html`
    }));

    // Construct the fully assembled raw HTML document
    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name} - ${page.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Reset basic styles and allow Tailwind to process freely */
    body { font-family: sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; min-height: 100vh; }
    /* Generic animations for the templates */
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
  </style>
</head>
<body>
  \${componentHtml}

  <script>
    // Navigation Interceptor
    // The React templates natively drop 'onClick' during static compilation.
    // This script manually attaches click listeners matching the parsed HTML elements to valid local paths.
    
    document.addEventListener("DOMContentLoaded", () => {
      const navMap = ${JSON.stringify(navigationMap)};
      
      // Look for clickable spans in the DOM
      const spans = document.querySelectorAll('span.cursor-pointer');
      spans.forEach(span => {
        const text = span.innerText.trim();
        const target = navMap.find(m => m.name === text);
        if (target) {
          span.onclick = (e) => {
            e.preventDefault();
            window.location.href = target.filename;
          };
        }
      });

      // Special handling for Buttons inside Templates
      // E.g. "Launch" button or similar that might map to existing link configurations.
      // Easiest hack is capturing their text if mapped against 'links' object.
      // But for a pure static payload, ensuring basic top navigation works is primary!
    });
  </script>
</body>
</html>`;

    // Add exactly generated HTML file into our JSZip buffer block
    zip.file(filename, finalHtml);
  }

  // Finalize zip compression asynchronously
  return await zip.generateAsync({ type: 'blob' });
};

export const deployToNetlify = async (zipBlob: Blob, token: string): Promise<string> => {
  const response = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/zip'
    },
    body: zipBlob
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Netlify API Error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  // `data.url` contains the canonical https link provided by Netlify!
  return data.url || data.ssl_url || `https://${data.name}.netlify.app`;
};

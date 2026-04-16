import { renderToStaticMarkup } from 'react-dom/server';
import { Octokit } from '@octokit/rest';
import { WebsiteProject } from '@/contexts/ProjectContext';
import { WebsiteTemplate } from '@/templates/TemplateSystem';

export interface StaticFile {
  path: string;
  content: string;
}

export const generateStaticHtmlFiles = (project: WebsiteProject): StaticFile[] => {
  if (!project.pages || project.pages.length === 0) {
    throw new Error('Project has no pages to deploy.');
  }

  const files: StaticFile[] = [];

  for (const page of project.pages) {
    // Generate valid filename
    let filename = page.path === '/' ? 'index.html' : `${page.path.startsWith('/') ? page.path.slice(1) : page.path}.html`;
    if (!filename.endsWith('.html')) filename += '.html';

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

    const navigationMap = project.pages.map(p => ({
      name: p.name,
      filename: p.path === '/' ? 'index.html' : `${p.path.startsWith('/') ? p.path.slice(1) : p.path}.html`
    }));

    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.name} - ${page.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; min-height: 100vh; }
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
    .animate-float { animation: float 3s ease-in-out infinite; }
  </style>
</head>
<body>
  ${componentHtml}

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const navMap = ${JSON.stringify(navigationMap)};
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
    });
  </script>
</body>
</html>`;

    files.push({ path: filename, content: finalHtml });
  }

  return files;
};

export const deployToGithubPages = async (project: WebsiteProject, token: string, repoName: string): Promise<string> => {
  const octokit = new Octokit({ auth: token });
  
  // 1. Authenticate and get user
  const user = await octokit.rest.users.getAuthenticated();
  const owner = user.data.login;

  // 2. Create the repository
  const repoRes = await octokit.rest.repos.createForAuthenticatedUser({
    name: repoName,
    private: false, // Mandatory for free GitHub Pages
    auto_init: true
  });
  const defaultBranch = repoRes.data.default_branch || 'main';

  // Wait a moment for GitHub to initialize the repo on their end
  await new Promise(r => setTimeout(r, 2000));

  // Generate the static files
  const files = generateStaticHtmlFiles(project);

  // 3. Get current branch reference
  const refRes = await octokit.rest.git.getRef({
    owner,
    repo: repoName,
    ref: `heads/${defaultBranch}`
  });
  const commitSha = refRes.data.object.sha;

  // Get the commit to find the base tree
  const commitRes = await octokit.rest.git.getCommit({
    owner,
    repo: repoName,
    commit_sha: commitSha
  });
  const baseTreeSha = commitRes.data.tree.sha;

  // 4. Create a new Tree containing our files
  const tree = files.map(file => ({
    path: file.path,
    mode: '100644' as const,
    type: 'blob' as const,
    content: file.content
  }));

  const treeRes = await octokit.rest.git.createTree({
    owner,
    repo: repoName,
    base_tree: baseTreeSha,
    tree
  });

  // 5. Create a new commit
  const newCommitRes = await octokit.rest.git.createCommit({
    owner,
    repo: repoName,
    message: 'Deploy static website via WebCraft',
    tree: treeRes.data.sha,
    parents: [commitSha]
  });

  // 6. Update reference to point to new commit
  await octokit.rest.git.updateRef({
    owner,
    repo: repoName,
    ref: `heads/${defaultBranch}`,
    sha: newCommitRes.data.sha
  });

  // Wait another moment before setting up pages
  await new Promise(r => setTimeout(r, 2000));

  // 7. Enable GitHub Pages
  await octokit.rest.repos.createPagesSite({
    owner,
    repo: repoName,
    source: {
      branch: defaultBranch,
      path: '/'
    }
  });

  // Return the live URL
  return `https://${owner}.github.io/${repoName}`;
};

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'templates');
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('Templates.tsx'));

templateFiles.forEach(file => {
  let content = fs.readFileSync(path.join(templatesDir, file), 'utf-8');

  // Add onGlobalEdit to TemplateProps if missing
  if (!content.includes('onGlobalEdit?: (region: string) => void;')) {
    content = content.replace(
      /onNavigate\?:\s*\(pageId:\s*string\)\s*=>\s*void;/,
      'onNavigate?: (pageId: string) => void;\n  onGlobalEdit?: (region: string) => void;'
    );
  }

  // Add to props destructured list
  content = content.replace(
    /({ name, logo, pages, content, onNavigate }: TemplateProps)/g,
    '({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps)'
  );

  // Apply onClick to <nav> / <header> tags for global settings
  content = content.replace(
    /(<(?:nav|header)[^>]*)>/g,
    (match, p1) => {
      if (p1.includes('onGlobalEdit')) return match;
      if (p1.includes('onClick')) return match; // simple skip if it exists
      return `${p1} onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>`;
    }
  );

  // Apply onClick to <footer> tags for global settings
  content = content.replace(
    /(<footer[^>]*)>/g,
    (match, p1) => {
      if (p1.includes('onGlobalEdit')) return match;
      if (p1.includes('onClick')) return match; 
      return `${p1} onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>`;
    }
  );

  fs.writeFileSync(path.join(templatesDir, file), content, 'utf-8');
});

console.log("Refactored templates for global edit clicks.");

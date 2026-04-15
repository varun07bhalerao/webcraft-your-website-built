const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'templates');
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('Templates.tsx'));

templateFiles.forEach(file => {
  let content = fs.readFileSync(path.join(templatesDir, file), 'utf-8');

  // 1. Update TemplateProps
  content = content.replace(
    /interface TemplateProps\s*{\s*name:\s*string;\s*content:\s*Record<string,\s*any>;\s*}/,
    `interface TemplateProps {
  name: string;
  content: Record<string, any>;
  pages?: { id: string; name: string; path: string }[];
  logo?: string;
  onNavigate?: (pageId: string) => void;
}`
  );

  // 2. Update Component Props
  content = content.replace(
    /({ name, content }: TemplateProps)/g,
    `({ name, content, pages = [], logo, onNavigate }: TemplateProps)`
  );

  // 3. Dynamic header navigation links
  // Look for a div inside a nav/header containing multiple <span> or <a> tags with typical nav names
  // e.g. <div className="...">\s*<span>Home</span>...</div>
  // We will replace the children with a pages.map() call.

  const navRegex = /(<div[^>]*>)\s*(?:<span[^>]*>[A-Za-z\s]+<\/span>\s*)+(<\/div>)/g;
  content = content.replace(navRegex, (match, openDiv, closeDiv) => {
    // Extract className from the first child span, if any, to apply hover styles
    const childMatch = match.match(/<span([^>]*)>/);
    let childAttrs = childMatch ? childMatch[1] : ' className="cursor-pointer hover:opacity-80 transition-opacity"';
    
    // Add onClick and cursor-pointer if not present
    if (!childAttrs.includes('cursor-pointer')) {
      childAttrs = childAttrs.replace('className="', 'className="cursor-pointer ');
      if (childAttrs === childMatch?.[1]) { // If it didn't have className
         childAttrs += ' className="cursor-pointer"';
      }
    }

    return `${openDiv}
        {pages.length > 0 ? pages.map(p => (
          <span key={p.id} ${childAttrs} onClick={() => onNavigate?.(p.id)}>{p.name}</span>
        )) : (
          <>
            <span ${childAttrs}>Home</span>
            <span ${childAttrs}>About</span>
            <span ${childAttrs}>Contact</span>
          </>
        )}
      ${closeDiv}`;
  });

  // 4. Logo replacement
  // Replace the first large span in header/nav that acts as the logo
  // Something like: <span className="font-bold text-xl">{name}</span> or ENTERPRISE+
  // We can use a regex to look for <span ...>{name}</span> OR <span ...>ENTERPRISE+</span>
  
  // Since we also have to do Custom Element Linking, let's inject it into buttons
  const buttonRegex = /<button([^>]*)>({content\.[a-z]+\?.cta})<\/button>/g;
  content = content.replace(buttonRegex, (match, attrs, text) => {
    // Extract section from content.home?.cta -> home
    const sectionMatch = text.match(/content\.([a-z]+)\?\.cta/);
    if (!sectionMatch) return match;
    const section = sectionMatch[1];
    
    return `<button${attrs} onClick={() => { content.links?.['${section}_cta'] && onNavigate?.(content.links['${section}_cta']); }}>${text}</button>`;
  });

  fs.writeFileSync(path.join(templatesDir, file), content, 'utf-8');
});

console.log("Refactored templates automatically.");

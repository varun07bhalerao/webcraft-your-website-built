import React from 'react';
import { WebsiteType } from '@/contexts/ProjectContext';

interface TemplateProps {
  name: any;
  logo?: string;
  pages?: { id: string, name: string, path: string }[];
  content: Record<string, any>;
  onNavigate?: (pageId: string) => void;
  onGlobalEdit?: (region: string) => void;
}

export const EducationTemplate1 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-full bg-[hsl(170,20%,97%)] text-slate-800">
    <nav className="bg-[hsl(170,55%,25%)] text-white px-8 py-6 flex items-center justify-between" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
      {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-bold text-2xl">{name}</span>}
      <div className="flex gap-8 text-sm font-medium">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className=" cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
      <button className="bg-[hsl(170,55%,42%)] hover:bg-[hsl(170,55%,35%)] px-6 py-2 rounded font-bold transition-colors">Enroll Now</button>
    </nav>
    <div className="bg-[hsl(170,40%,92%)] px-8 py-32 text-center border-b border-[hsl(170,30%,85%)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[hsl(170,55%,20%)] mb-6 leading-tight">{content.home?.headline}</h1>
        <p className="text-[hsl(170,40%,30%)] text-xl mb-10 leading-relaxed">{content.home?.subtext}</p>
        <button className="bg-[hsl(170,55%,25%)] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[hsl(170,55%,20%)] transition-colors shadow-xl shadow-[hsl(170,55%,25%)]/20" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-8 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-[hsl(170,55%,25%)] mb-6">{content.about?.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed bg-white p-8 rounded-2xl shadow-sm border border-slate-100">{content.about?.text}</p>
        </div>
        <div className="bg-[hsl(170,55%,25%)] p-12 rounded-3xl text-white text-center shadow-2xl">
           <div className="text-6xl mb-6">🎓</div>
           <h3 className="text-2xl font-bold mb-4">Excellence in Education</h3>
           <p className="opacity-80 leading-relaxed">Join thousands of students achieving their dreams with our comprehensive programs.</p>
        </div>
      </div>
    </div>
    <div className="bg-white py-24 px-8 border-t border-[hsl(170,20%,90%)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[hsl(170,55%,25%)] mb-16">{content.services?.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {(content.services?.items || []).map((s: string, i: number) => (
            <div key={i} className="bg-[hsl(170,20%,97%)] rounded-2xl p-8 border border-[hsl(170,20%,90%)] hover:border-[hsl(170,55%,42%)] transition-colors group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[hsl(170,55%,42%)]/10 flex items-center justify-center mb-6 text-[hsl(170,55%,35%)] group-hover:bg-[hsl(170,55%,42%)] group-hover:text-white transition-colors">
                 <span className="font-bold text-xl">{i+1}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[hsl(170,55%,20%)]">{s}</h3>
              <p className="text-slate-600 leading-relaxed">Discover your potential with our expertly crafted curriculum.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <footer className="bg-[hsl(170,55%,20%)] text-white/80 px-8 py-16 text-center" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-8">{content.contact?.title}</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-lg mb-12 bg-white/5 p-6 rounded-2xl border border-white/10 w-full">
           <div className="flex items-center gap-3">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className=" cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
           <div className="flex items-center gap-3">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className=" cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
        </div>
        <div className="w-full h-px bg-white/10 mb-8" />
        <p className="text-sm">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

export const EducationTemplate2 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-full bg-slate-50 text-slate-900">
    <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
      {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-black text-2xl text-[hsl(200,50%,45%)] tracking-tight">{name}</span>}
      <div className="flex gap-6 text-sm font-semibold text-slate-600">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-[hsl(200,50%,45%)] cursor-pointer cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
      <button className="border-2 border-[hsl(200,50%,45%)] text-[hsl(200,50%,45%)] px-5 py-2 rounded-lg font-bold hover:bg-[hsl(200,50%,45%)] hover:text-white transition-colors">Sign In</button>
    </nav>
    <div className="bg-slate-900 text-white px-8 py-32 overflow-hidden relative">
      <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-gradient-to-l from-[hsl(200,50%,30%)] to-transparent opacity-20 transform -skew-x-12" />
      <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6">{content.home?.headline}</h1>
          <p className="text-slate-400 text-xl md:text-2xl leading-relaxed mb-10">{content.home?.subtext}</p>
          <button className="bg-[hsl(200,50%,50%)] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[hsl(200,50%,45%)] transition-colors shadow-lg shadow-blue-900/50" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
           {['Technology', 'Business', 'Design', 'Marketing'].map((cat, i) => (
             <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
               <div className="w-10 h-10 bg-[hsl(200,50%,50%)]/20 rounded-lg mb-4 flex items-center justify-center text-[hsl(200,50%,60%)] font-bold">0{i+1}</div>
               <h3 className="font-bold text-lg">{cat}</h3>
             </div>
           ))}
        </div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-6">{content.about?.title}</h2>
        <p className="text-slate-500 text-xl max-w-3xl mx-auto leading-relaxed">{content.about?.text}</p>
      </div>
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
         <span className="bg-[hsl(200,50%,15%)] text-white p-2 rounded-lg">🚀</span>
         {content.services?.title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(content.services?.items || []).map((s: string, i: number) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow cursor-pointer group flex flex-col h-full">
            <div className="w-full h-32 bg-slate-100 rounded-xl mb-6 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,50%,45%)]/10 to-transparent group-hover:opacity-50 transition-opacity" />
            </div>
            <h4 className="font-bold text-xl mb-2 flex-grow">{s}</h4>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500 mt-4 pt-4 border-t border-slate-100">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
          </div>
        ))}
      </div>
    </div>
    <footer className="bg-white border-t border-slate-200 py-16 px-8 text-center text-slate-500" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
      <div className="mb-8 font-black text-2xl text-slate-900">{name}</div>
      <p className="mb-4 font-medium">{content.contact?.title} • <a href={`mailto:${content.contact?.email}`} className="text-[hsl(200,50%,45%)]">{content.contact?.email}</a></p>
      <p className="text-sm">© {new Date().getFullYear()} {name} Learning Platform</p>
    </footer>
  </div>
);

export const EducationTemplate3 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[#f0f9ff] text-[#0f172a] relative overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#fcd34d]/40 mix-blend-multiply blur-xl animate-pulse" />
    <div className="absolute top-40 right-40 w-48 h-48 rounded-full bg-[#f472b6]/30 mix-blend-multiply blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute bottom-40 left-1/2 w-64 h-64 rounded-full bg-[#34d399]/30 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    
    <nav className="bg-[#0ea5e9] text-white px-8 py-5 flex items-center justify-between rounded-b-3xl mx-4 shadow-lg sticky top-0 z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
      {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-black text-2xl bg-white text-[#0ea5e9] px-6 py-2 rounded-full shadow-inner transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer border-4 border-[#0ea5e9] outline outline-4 outline-white">{name}</span>}
      <div className="hidden md:flex gap-6 font-bold text-lg">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-[#fef08a] transition-colors cursor-pointer cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
      <button className="bg-[#facc15] text-[#854d0e] px-8 py-3 rounded-full font-black text-lg shadow-[0_4px_0_#ca8a04] hover:translate-y-1 hover:shadow-none transition-all">Join Fun!</button>
    </nav>
    
    <div className="max-w-6xl mx-auto px-8 py-24 text-center relative z-10">
      <h1 className="text-6xl md:text-[5rem] font-black text-[#0284c7] mb-8 leading-[1.1] drop-shadow-sm transform -rotate-1">{content.home?.headline}</h1>
      <p className="text-2xl md:text-3xl text-[#334155] font-semibold max-w-3xl mx-auto leading-relaxed mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border-2 border-white">{content.home?.subtext}</p>
      <button className="bg-[#ef4444] text-white text-2xl px-12 py-5 rounded-full font-black shadow-[0_6px_0_#b91c1c] hover:translate-y-1 hover:shadow-[0_2px_0_#b91c1c] transition-all transform hover:scale-105 active:scale-95" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
    </div>
    
    <div className="bg-white/80 backdrop-blur-md py-24 px-8 mt-12 rounded-[3rem] mx-4 shadow-xl border-4 border-white relative z-10 mb-20">
      <div className="max-w-5xl mx-auto">
         <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="md:w-1/2">
               <div className="text-8xl mb-6">🎈</div>
               <h2 className="text-5xl font-black text-[#f59e0b] mb-6">{content.about?.title}</h2>
            </div>
            <div className="md:w-1/2">
               <p className="text-[#475569] text-2xl font-medium leading-relaxed bg-[#f8fafc] p-8 rounded-3xl border-2 border-[#e2e8f0] shadow-inner">{content.about?.text}</p>
            </div>
         </div>
         
         <div className="text-center mb-16">
            <span className="bg-[#10b981] text-white text-2xl font-black px-8 py-3 rounded-full shadow-[0_4px_0_#047857] inline-block transform rotate-2">{content.services?.title}</span>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8">
            {(content.services?.items || []).map((s: string, i: number) => {
               const colors = [
                  { bg: 'bg-[#fbbf24]', border: 'border-[#d97706]', shadow: 'shadow-[#d97706]', text: 'text-[#854d0e]' },
                  { bg: 'bg-[#60a5fa]', border: 'border-[#2563eb]', shadow: 'shadow-[#2563eb]', text: 'text-[#1e3a8a]' },
                  { bg: 'bg-[#a78bfa]', border: 'border-[#7c3aed]', shadow: 'shadow-[#7c3aed]', text: 'text-[#4c1d95]' },
                  { bg: 'bg-[#34d399]', border: 'border-[#059669]', shadow: 'shadow-[#059669]', text: 'text-[#064e3b]' },
               ];
               const c = colors[i % colors.length];
               return (
                  <div key={i} className={`${c.bg} border-4 border-white p-8 rounded-[3rem] shadow-[0_8px_0_rgba(0,0,0,0.1)] transform transition-transform hover:-translate-y-4 hover:rotate-3 cursor-pointer`}>
                     <div className="bg-white/30 w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black mb-6 border-4 border-white/50">{i+1}</div>
                     <h3 className={`text-3xl font-black ${c.text}`}>{s}</h3>
                  </div>
               );
            })}
         </div>
      </div>
    </div>
    
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 px-8 rounded-t-[3rem] text-center relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       <div className="max-w-4xl mx-auto flex flex-col items-center">
         <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 border-8 border-[#38bdf8] text-4xl">🚀</div>
         <h2 className="text-4xl font-black mb-4 text-[#38bdf8]">{content.contact?.title}</h2>
         <p className="text-2xl font-bold bg-[#1e293b] py-4 px-10 rounded-full mb-8 border-2 border-[#334155] text-[#94a3b8]">{content.contact?.email} ✨ {content.contact?.phone}</p>
         <p className="opacity-50 font-bold uppercase tracking-widest text-sm">© {new Date().getFullYear()} {name} Playful Learning</p>
       </div>
    </footer>
  </div>
);

export const EducationTemplate4 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-serif min-h-screen bg-[#f8f7f5] text-[#1e3a8a]">
    <header className="border-b-4 border-[#1e3a8a] bg-white px-8 py-10 text-center relative" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden md:block w-32 h-px bg-[#1e3a8a]/20" />
       <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block w-32 h-px bg-[#1e3a8a]/20" />
       <div className="inline-block border border-[#1e3a8a]/30 p-4 bg-white relative z-10">
         <div className="border border-[#1e3a8a] py-6 px-12">
            <h1 className="font-black text-4xl uppercase tracking-[0.2em] mb-2">{name}</h1>
            <div className="font-sans text-xs font-bold text-gray-500 uppercase tracking-widest">Established {new Date().getFullYear() - 100}</div>
         </div>
       </div>
    </header>
    
    <nav className="bg-[#1e3a8a] text-white py-4 px-8 sticky top-0 z-50 shadow-md" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       <div className="max-w-6xl mx-auto flex justify-center gap-8 md:gap-16 text-sm font-sans uppercase tracking-widest font-bold">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-amber-400 cursor-pointer transition-colors cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
    </nav>

    <div className="px-8 py-24 max-w-5xl mx-auto text-center">
       <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-[#0f172a]">{content.home?.headline}</h1>
       <p className="font-sans text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-12">{content.home?.subtext}</p>
       <button className="bg-amber-600 text-white font-sans uppercase tracking-widest font-bold text-sm px-10 py-5 hover:bg-[#1e3a8a] transition-colors" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
    </div>

    <div className="bg-white border-y border-gray-200">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          <div className="md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200">
             <h2 className="text-sm font-sans uppercase tracking-[0.3em] font-bold text-gray-400 mb-6">Our Legacy</h2>
             <h3 className="text-4xl md:text-5xl font-bold mb-8 text-[#0f172a]">{content.about?.title}</h3>
             <p className="font-sans text-lg text-gray-600 leading-relaxed font-light">{content.about?.text}</p>
          </div>
          <div className="md:w-1/2 bg-[#f8f7f5] p-12 md:p-24 flex flex-col justify-center">
             <div className="w-16 h-16 bg-[#1e3a8a] mb-8" />
             <div className="text-2xl font-bold italic text-[#0f172a] mb-6">"Truth, Knowledge, and the Pursuit of Excellence in all endeavors."</div>
             <div className="font-sans font-bold text-sm uppercase tracking-widest text-amber-600">— University Motto</div>
          </div>
       </div>
    </div>

    <div className="max-w-6xl mx-auto px-8 py-32">
       <div className="text-center mb-24">
          <div className="w-px h-16 bg-amber-600 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a]">{content.services?.title}</h2>
       </div>
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(content.services?.items || []).map((s: string, i: number) => (
             <div key={i} className="bg-white border border-gray-200 p-10 text-center hover:border-[#1e3a8a] transition-colors group">
                <div className="font-sans text-xs font-bold text-gray-400 mb-6 border-b border-gray-100 pb-4">PROGRAM 0{i+1}</div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-4 group-hover:text-amber-600 transition-colors">{s}</h3>
             </div>
          ))}
       </div>
    </div>

    <footer className="bg-[#0f172a] text-white pt-24 pb-12 px-8" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 mb-24 border-b border-gray-800 pb-24">
          <div>
             <h2 className="font-bold text-2xl uppercase tracking-widest mb-8 text-amber-500">{name}</h2>
             <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-xs">{content.about?.text?.substring(0, 100)}...</p>
          </div>
          <div>
             <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-6 text-gray-400 border-b border-gray-800 pb-2">Directory</h3>
             <ul className="font-sans space-y-4 text-sm text-gray-300">
                <li className="hover:text-amber-500 cursor-pointer transition-colors">Alumni Network</li>
                <li className="hover:text-amber-500 cursor-pointer transition-colors">Library Resources</li>
                <li className="hover:text-amber-500 cursor-pointer transition-colors">Campus Map</li>
             </ul>
          </div>
          <div>
             <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-6 text-gray-400 border-b border-gray-800 pb-2">{content.contact?.title}</h3>
             <div className="font-sans text-sm text-gray-300 space-y-2">
                <div>{content.contact?.phone}</div>
                <div className="text-amber-500">{content.contact?.email}</div>
             </div>
          </div>
       </div>
       <div className="text-center font-sans text-xs uppercase tracking-widest text-gray-600 font-bold">
          © {new Date().getFullYear()} {name}.
       </div>
    </footer>
  </div>
);

export const EducationTemplate5 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-mono min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a3e635] selection:text-black">
    <nav className="p-6 md:p-8 flex items-center justify-between border-b border-[#262626] sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-black text-xl md:text-2xl text-[#a3e635] tracking-tighter uppercase">{name}</span>}
       <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-white cursor-pointer cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
       <button className="bg-[#a3e635] text-black px-6 py-2 text-xs font-black uppercase hover:bg-white transition-colors duration-300">Apply_Now</button>
    </nav>
    
    <div className="border-b border-[#262626]">
       <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#262626]">
             <div className="text-xs font-bold text-[#a3e635] mb-8 uppercase tracking-[0.2em]">{'>'} init bootcamp</div>
             <h1 className="text-6xl md:text-8xl font-black leading-[0.8] uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">{content.home?.headline}</h1>
             <p className="text-xl text-gray-400 font-sans leading-relaxed mb-12">{content.home?.subtext}</p>
             <button className="border border-[#a3e635] text-[#a3e635] hover:bg-[#a3e635] hover:text-black px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all self-start" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
          </div>
          <div className="bg-[#111] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#a3e635] via-transparent to-transparent" />
             <div className="relative z-10 border border-[#262626] bg-[#0a0a0a] p-8">
               <div className="flex gap-2 mb-6 border-b border-[#262626] pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <div className="text-sm text-gray-500 leading-loose">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="text-blue-400 cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))};<br/><br/>
                  <span className="text-purple-400">async function</span> <span className="text-yellow-200">transformCareer</span>() {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-pink-500">await</span> Student.<span className="text-yellow-200">learn</span>(['HTML', 'CSS', 'JS', 'React']);<br/>
                  &nbsp;&nbsp;<span className="text-pink-500">return</span> <span className="text-green-400">'Hired'</span>;<br/>
                  {'}'}
               </div>
             </div>
          </div>
       </div>
    </div>

    <div className="max-w-6xl mx-auto px-8 py-32">
       <div className="mb-24 flex flex-col md:flex-row gap-16 items-start">
         <div className="md:w-1/3">
           <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 border-l-4 border-[#a3e635] pl-6 py-2">{content.about?.title}</h2>
         </div>
         <div className="md:w-2/3">
           <p className="text-xl text-gray-400 font-sans leading-relaxed">{content.about?.text}</p>
         </div>
       </div>

       <div>
          <h2 className="text-sm font-bold text-[#a3e635] mb-12 uppercase tracking-[0.2em]">{'>'} load_modules // {content.services?.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
             {(content.services?.items || []).map((s: string, i: number) => (
               <div key={i} className="border border-[#262626] hover:border-[#a3e635] p-6 bg-[#111] transition-colors group flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-widest">Module 0{i+1}</div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-gray-300 group-hover:text-white">{s}</h3>
                  </div>
                  <div className="w-8 h-8 rounded border border-[#262626] flex items-center justify-center text-[#a3e635] font-black group-hover:bg-[#a3e635] group-hover:text-black transition-colors">+</div>
               </div>
             ))}
          </div>
       </div>
    </div>

    <footer className="border-t border-[#262626] bg-[#111] px-8 py-16 text-center mt-20" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
       <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{content.contact?.title}</h2>
       <div className="flex justify-center gap-8 text-sm font-bold uppercase tracking-widest mb-16">
          <a href={`mailto:${content.contact?.email}`} className="text-[#a3e635] hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">{content.contact?.email}</a>
          <span className="text-gray-600">||</span>
          <a href={`tel:${content.contact?.phone}`} className="text-gray-400 hover:text-white transition-colors">{content.contact?.phone}</a>
       </div>
       <div className="text-xs text-gray-700 font-bold uppercase tracking-[0.2em]">{name} _ {new Date().getFullYear()}</div>
    </footer>
  </div>
);

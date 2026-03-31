import React from 'react';
import { WebsiteType } from '@/contexts/ProjectContext';

interface TemplateProps {
  name: string;
  content: Record<string, any>;
}

export const PortfolioTemplate1 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-[hsl(0,0%,5%)] text-white">
    <nav className="px-8 py-6 flex items-center justify-between border-b border-white/10">
      <span className="font-bold text-xl tracking-widest">{name}</span>
      <div className="flex gap-8 text-sm opacity-60"><span>Work</span><span>About</span><span>Contact</span></div>
    </nav>
    <div className="px-8 py-32">
      <h1 className="text-7xl font-bold leading-none tracking-tighter hover:text-[hsl(330,65%,50%)] transition-colors duration-500">{content.home?.headline}</h1>
      <p className="opacity-50 mt-8 text-2xl max-w-2xl">{content.home?.subtext}</p>
      <button className="mt-12 group flex items-center gap-4 text-xl font-bold">
        {content.home?.cta}
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">→</div>
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 pb-32">
      <div className="aspect-[4/5] bg-gradient-to-br from-[hsl(330,65%,50%)] to-[hsl(280,60%,40%)] rounded-3xl p-12 flex flex-col justify-end overflow-hidden relative group">
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
         <h3 className="text-3xl font-bold relative z-10">{content.services?.items?.[0] || 'Design'}</h3>
      </div>
      <div className="aspect-[4/5] bg-gradient-to-br from-[hsl(200,60%,50%)] to-[hsl(220,60%,40%)] rounded-3xl p-12 flex flex-col justify-end mt-0 md:mt-32 overflow-hidden relative group">
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
         <h3 className="text-3xl font-bold relative z-10">{content.services?.items?.[1] || 'Development'}</h3>
      </div>
    </div>
    <div className="px-8 py-32 border-t border-white/10 flex flex-col items-center text-center">
       <h2 className="text-4xl font-bold mb-8">{content.about?.title}</h2>
       <p className="text-xl opacity-60 max-w-3xl leading-relaxed">{content.about?.text}</p>
    </div>
    <footer className="px-8 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
       <span className="text-2xl font-bold tracking-widest">{name}</span>
       <div className="flex gap-6 mt-6 md:mt-0">
         <span>{content.contact?.email}</span>
         <span>{content.contact?.phone}</span>
       </div>
       <span className="mt-6 md:mt-0 text-sm">© {new Date().getFullYear()}</span>
    </footer>
  </div>
);

export const PortfolioTemplate2 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-[hsl(40,20%,96%)] text-stone-800">
    <nav className="px-12 py-8 flex items-center justify-between">
      <span className="font-bold text-2xl font-serif text-stone-900">{name}</span>
      <div className="flex gap-8 text-sm font-medium text-stone-500 uppercase tracking-widest">
        <span>Projects</span><span>About</span><span>Contact</span>
      </div>
    </nav>
    <div className="px-12 py-32 max-w-5xl">
      <h1 className="text-7xl font-bold font-serif leading-[1.1] text-stone-900 mb-8">{content.home?.headline}</h1>
      <p className="text-2xl text-stone-500 font-light max-w-2xl leading-relaxed">{content.home?.subtext}</p>
      <button className="mt-16 border-b-2 border-stone-800 pb-2 text-lg font-bold uppercase tracking-widest hover:text-stone-500 hover:border-stone-500 transition-all">{content.home?.cta}</button>
    </div>
    <div className="px-12 py-20 bg-stone-100">
      <div className="flex flex-col md:flex-row gap-20">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-serif font-bold mb-8 text-stone-900">{content.about?.title}</h2>
        </div>
        <div className="md:w-2/3">
          <p className="text-xl leading-relaxed text-stone-600 font-light">{content.about?.text}</p>
        </div>
      </div>
    </div>
    <div className="px-12 py-32 space-y-32">
      {(content.services?.items || []).map((s: string, i: number) => (
        <div key={i} className="flex flex-col md:flex-row gap-12 items-center group cursor-pointer">
           <div className={`w-full md:w-1/2 aspect-video bg-stone-200 rounded-lg overflow-hidden ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
             <div className="w-full h-full bg-[hsl(40,10%,90%)] transition-transform duration-700 group-hover:scale-105" />
           </div>
           <div className={`w-full md:w-1/2 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
             <span className="text-stone-400 font-serif italic text-xl mb-4 block">0{i+1}</span>
             <h3 className="text-4xl font-bold font-serif text-stone-900 mb-6 group-hover:text-stone-500 transition-colors">{s}</h3>
             <p className="text-stone-500 text-lg leading-relaxed">A detailed look into the creative process and execution of this signature project.</p>
           </div>
        </div>
      ))}
    </div>
    <footer className="px-12 py-20 border-t border-stone-200 text-center">
       <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">{content.contact?.title}</h2>
       <p className="text-stone-500 text-xl font-light mb-12">{content.contact?.email} / {content.contact?.phone}</p>
       <span className="font-bold text-xl font-serif text-stone-900 block mb-4">{name}</span>
       <p className="text-stone-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  </div>
);

export const PortfolioTemplate3 = ({ name, content }: TemplateProps) => (
  <div className="font-mono min-h-full bg-[#0d1117] text-[#c9d1d9] selection:bg-[#1f6feb] selection:text-white">
    <div className="bg-[#161b22] px-6 py-3 flex items-center justify-between border-b border-[#30363d] text-sm">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"/>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"/>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"/>
      </div>
      <span className="text-[#8b949e]">~ / portfolio / {name.toLowerCase().replace(/\s+/g, '-')}</span>
      <div className="text-xs text-[#8b949e]">bash - 100x40</div>
    </div>
    <div className="p-8 md:p-16">
      <div className="mb-12">
        <span className="text-[#7ee787]">visitor@net</span><span className="text-[#8b949e]">:~ $</span> <span className="text-[#c9d1d9]">whoami</span>
        <h1 className="text-5xl font-bold mt-4 mb-6 text-[#58a6ff] glow">{content.home?.headline}</h1>
        <p className="text-xl text-[#8b949e] max-w-3xl leading-relaxed">{'>'} {content.home?.subtext}</p>
        <button className="mt-8 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] px-6 py-2 rounded-md font-bold transition-colors">
          ./{content.home?.cta?.toLowerCase().replace(/\s+/g, '-')}
        </button>
      </div>
      
      <div className="mb-12 border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
         <div className="bg-[#161b22] px-4 py-2 text-sm text-[#8b949e] border-b border-[#30363d] flex justify-between">
           <span>about.json</span>
           <span>UTF-8</span>
         </div>
         <div className="p-6 text-sm md:text-base leading-relaxed">
            <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">profile</span> <span className="text-[#ff7b72]">=</span> {'{'}
            <div className="pl-8">
              <span className="text-[#7ee787]">"title"</span>: <span className="text-[#a5d6ff]">"{content.about?.title}"</span>,<br/>
              <span className="text-[#7ee787]">"bio"</span>: <span className="text-[#a5d6ff]">"{content.about?.text}"</span>
            </div>
            {'}'};
         </div>
      </div>

      <div className="mb-12">
        <span className="text-[#7ee787]">visitor@net</span><span className="text-[#8b949e]">:~ $</span> <span className="text-[#c9d1d9]">ls -la skills/</span>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(content.services?.items || []).map((s: string, i: number) => (
            <div key={i} className="flex items-center gap-4 text-[#8b949e] font-mono p-4 border border-[#30363d] rounded bg-[#161b22]/50 hover:border-[#58a6ff] hover:text-[#c9d1d9] transition-colors cursor-pointer">
              <span className="text-[#d2a8ff]">drwxr-xr-x</span>
              <span className="text-[#58a6ff] font-bold">{s.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
    <div className="border-t border-[#30363d] p-8 mt-20 flex flex-col md:flex-row justify-between items-center text-sm text-[#8b949e] bg-[#161b22]">
       <div>
         <span className="text-[#7ee787]">echo</span> <span className="text-[#a5d6ff]">"{content.contact?.email}"</span><br/>
         <span className="text-[#7ee787]">echo</span> <span className="text-[#a5d6ff]">"{content.contact?.phone}"</span>
       </div>
       <div className="mt-6 md:mt-0 opacity-50">
         /* © {new Date().getFullYear()} {name} */
       </div>
    </div>
  </div>
);

export const PortfolioTemplate4 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-white text-black flex flex-col md:flex-row">
    <div className="md:w-24 md:h-screen md:sticky top-0 bg-[#f8f9fa] border-r border-gray-200 flex flex-row md:flex-col items-center justify-between py-8 px-6 md:px-0 text-sm uppercase font-bold tracking-[0.2em] transform transition-all z-20">
      <div className="md:-rotate-90 origin-center whitespace-nowrap mb-0 md:mb-12 mr-6 md:mr-0">{name}</div>
      <div className="flex flex-row md:flex-col gap-6 md:gap-12 md:-rotate-90 origin-center text-gray-400">
        <span className="hover:text-black cursor-pointer transition-colors">Work</span>
        <span className="hover:text-black cursor-pointer transition-colors">About</span>
      </div>
      <div className="hidden md:block w-px h-12 bg-black/20 mt-12" />
    </div>
    <div className="flex-1 p-8 md:p-16 lg:p-24 overflow-auto">
      <div className="mb-24 md:mb-40 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">{content.home?.headline}</h1>
        <p className="text-xl md:text-3xl text-gray-500 font-light leading-snug">{content.home?.subtext}</p>
        <button className="mt-12 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">{content.home?.cta}</button>
      </div>
      
      <div className="mb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
           {(content.services?.items || []).map((s: string, i: number) => (
             <div key={i} className="break-inside-avoid relative group overflow-hidden bg-gray-100 rounded-xl cursor-pointer">
               <div className={`w-full ${i % 3 === 0 ? 'aspect-square' : i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-video'} bg-gray-200 transition-transform duration-700 group-hover:scale-105`} />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                  <h3 className="text-white font-bold text-2xl uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{s}</h3>
               </div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-gray-50 p-12 md:p-20 rounded-3xl mb-32 max-w-5xl mx-auto text-center">
         <h2 className="text-3xl font-black uppercase tracking-tight mb-8">{content.about?.title}</h2>
         <p className="text-xl leading-relaxed text-gray-600 mb-12">{content.about?.text}</p>
         <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-sm font-bold uppercase tracking-widest">
            <a href={`mailto:${content.contact?.email}`} className="border-b-2 border-transparent hover:border-black pb-1">{content.contact?.email}</a>
            <a href={`tel:${content.contact?.phone}`} className="border-b-2 border-transparent hover:border-black pb-1">{content.contact?.phone}</a>
         </div>
      </div>

      <footer className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 py-12">
        © {new Date().getFullYear()} {name} — ALL RIGHTS RESERVED
      </footer>
    </div>
  </div>
);

export const PortfolioTemplate5 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-black text-white relative overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,#3b0764,transparent_70%)] opacity-60 mix-blend-screen pointer-events-none" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,#1e1b4b,transparent_70%)] opacity-80 mix-blend-screen pointer-events-none" />
    
    <nav className="relative z-10 px-8 py-8 flex justify-between items-center mix-blend-difference">
      <span className="font-black text-2xl tracking-[0.2em]">{name}</span>
      <div className="font-bold text-xs tracking-widest uppercase opacity-70">Interactive // 2026</div>
    </nav>
    
    <div className="relative z-10 px-8 md:px-24 py-32 md:py-48 flex flex-col justify-center min-h-[80vh]">
      <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.8] mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-200 to-purple-800 drop-shadow-2xl selection:bg-purple-500 selection:text-white pb-4">{content.home?.headline}</h1>
      <p className="text-2xl md:text-4xl font-light opacity-80 max-w-3xl leading-tight mb-16">{content.home?.subtext}</p>
      <div>
        <button className="bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 px-10 py-5 rounded-full font-bold text-lg uppercase tracking-widest transition-all duration-500 shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]">
          {content.home?.cta}
        </button>
      </div>
    </div>
    
    <div className="relative z-10 bg-black/40 backdrop-blur-3xl border-t border-white/10 px-8 md:px-24 py-32">
       <div className="max-w-4xl">
         <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-400 mb-6">{content.about?.title}</h2>
         <p className="text-3xl md:text-5xl font-light leading-snug">{content.about?.text}</p>
       </div>
    </div>

    <div className="relative z-10 px-8 md:px-24 py-32">
       <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-purple-400 mb-16">{content.services?.title}</h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {(content.services?.items || []).map((s: string, i: number) => (
           <div key={i} className="group relative bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors backdrop-blur-sm overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-6xl font-black opacity-10 mb-8 font-serif italic">0{i+1}</div>
              <h3 className="text-3xl font-bold mb-4">{s}</h3>
              <p className="opacity-60 text-lg">Pushing boundaries in digital experiences and creating memorable interactions.</p>
           </div>
         ))}
       </div>
    </div>

    <footer className="relative z-10 border-t border-white/10 px-8 md:px-24 py-16 flex flex-col md:flex-row justify-between items-end">
       <div>
         <h2 className="text-4xl font-bold mb-6">{content.contact?.title}</h2>
         <a href={`mailto:${content.contact?.email}`} className="text-2xl opacity-60 hover:opacity-100 transition-opacity block mb-2">{content.contact?.email}</a>
         <a href={`tel:${content.contact?.phone}`} className="text-xl opacity-60 hover:opacity-100 transition-opacity block">{content.contact?.phone}</a>
       </div>
       <div className="text-sm font-bold uppercase tracking-widest opacity-30 mt-12 md:mt-0 text-right">
         © {new Date().getFullYear()} {name} <br/> DIGITAL EXCELLENCE
       </div>
    </footer>
  </div>
);

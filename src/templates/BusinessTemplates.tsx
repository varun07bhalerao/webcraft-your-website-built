import React from 'react';
import { WebsiteType } from '@/contexts/ProjectContext';

interface TemplateProps {
  name: string;
  content: Record<string, any>;
}

export const BusinessTemplate1 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-white">
    <nav className="bg-[hsl(215,70%,50%)] text-white px-8 py-4 flex items-center justify-between">
      <span className="font-bold text-xl">{name}</span>
      <div className="flex gap-6 text-sm">
        <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
      </div>
    </nav>
    <div className="bg-[hsl(215,70%,95%)] px-8 py-20 text-center">
      <h1 className="text-4xl font-bold text-[hsl(215,70%,30%)]">{content.home?.headline}</h1>
      <p className="text-[hsl(215,30%,45%)] mt-3 text-lg max-w-xl mx-auto">{content.home?.subtext}</p>
      <button className="mt-6 bg-[hsl(215,70%,50%)] text-white px-8 py-3 rounded-lg font-semibold">{content.home?.cta}</button>
    </div>
    <div className="px-8 py-16">
      <h2 className="text-2xl font-bold text-center mb-4">{content.about?.title}</h2>
      <p className="text-center text-[hsl(215,15%,50%)] max-w-2xl mx-auto">{content.about?.text}</p>
    </div>
    <div className="bg-muted/30 px-8 py-16">
      <h2 className="text-2xl font-bold text-center mb-8">{content.services?.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {(content.services?.items || []).map((s: string, i: number) => (
          <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-border">
            <div className="w-10 h-10 rounded-lg bg-[hsl(215,70%,50%)]/10 mx-auto mb-3" />
            <h3 className="font-semibold">{s}</h3>
          </div>
        ))}
      </div>
    </div>
    <footer className="bg-[hsl(215,70%,15%)] text-white px-8 py-10 text-center">
      <h2 className="text-xl font-bold mb-2">{content.contact?.title}</h2>
      <p className="opacity-60">{content.contact?.email} • {content.contact?.phone}</p>
      <p className="opacity-40 text-xs mt-6">© {name} {new Date().getFullYear()}</p>
    </footer>
  </div>
);

export const BusinessTemplate2 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-white">
    <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <span className="font-bold text-xl tracking-tight">ENTERPRISE+</span>
      <div className="flex gap-8 text-xs uppercase tracking-widest font-medium opacity-80">
        <span>Solutions</span><span>About</span><span>Contact</span>
      </div>
    </header>
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-32 text-white">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-extrabold leading-tight">{content.home?.headline}</h1>
        <p className="text-white/80 mt-6 text-xl max-w-2xl">{content.home?.subtext}</p>
        <button className="mt-10 bg-white text-blue-700 px-8 py-4 rounded-md font-bold hover:bg-opacity-90 transition-all">{content.home?.cta}</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div className="p-16 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">{content.about?.title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">{content.about?.text}</p>
      </div>
      <div className="bg-slate-50 p-16">
        <h2 className="text-3xl font-bold mb-10">{content.services?.title}</h2>
        <div className="grid gap-6">
          {(content.services?.items || []).map((s: string, i: number) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
              <h3 className="font-bold text-slate-800">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
    <footer className="bg-slate-900 text-white p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center border-t border-slate-800">
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-slate-400 mt-2">{content.contact?.email} | {content.contact?.phone}</p>
      </div>
      <p className="text-slate-500 text-sm mt-8 md:mt-0">© {new Date().getFullYear()} {name} Enterprise Solutions</p>
    </footer>
  </div>
);

export const BusinessTemplate3 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-[#0f172a] text-slate-200">
    <nav className="bg-[#1e293b]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
      <span className="font-black text-2xl text-blue-400 tracking-tighter">VORTEX</span>
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <span>Product</span><span>Resources</span><span>Team</span><span>Contact</span>
      </div>
      <button className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20">Launch</button>
    </nav>
    <div className="px-8 py-32 text-center bg-[radial-gradient(circle_at_50%_0%,#1e293b,transparent_70%)]">
      <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 leading-none">{content.home?.headline}</h1>
      <p className="text-slate-400 mt-6 text-xl max-w-2xl mx-auto">{content.home?.subtext}</p>
      <div className="mt-12 flex gap-4 justify-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">{content.home?.cta}</button>
        <button className="border border-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors">Documentation</button>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">{content.about?.title}</h2>
        <p className="text-slate-400 max-w-3xl mx-auto text-lg">{content.about?.text}</p>
      </div>
      <h3 className="text-2xl font-bold text-white text-center mb-12">{content.services?.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(content.services?.items || []).map((s: string, i: number) => (
          <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <span className="font-bold">{i+1}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{s}</h3>
            <p className="text-slate-400 text-sm">Automated workflow solutions for modern scaling startups.</p>
          </div>
        ))}
      </div>
    </div>
    <footer className="border-t border-slate-800 py-20 px-8 text-center bg-[#070b14]">
      <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{name}</h2>
      <p className="text-blue-400 font-medium mb-8">{content.contact?.email}</p>
      <div className="flex justify-center gap-6 text-slate-500 text-sm">
        <span>Privacy</span><span>Terms</span><span>Security</span>
      </div>
      <p className="text-slate-600 text-xs mt-12">© {new Date().getFullYear()} Vortex Labs Inc.</p>
    </footer>
  </div>
);

export const BusinessTemplate4 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-full bg-[#fffbeb]">
    <div className="bg-[#f59e0b] h-2 w-full" />
    <nav className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-serif text-3xl font-bold text-[#92400e]">Corner Shop</span>
      <div className="flex gap-8 text-[#92400e] font-medium text-sm">
        <span>Menu</span><span>About</span><span>Location</span><span>Contact</span>
      </div>
      <button className="bg-[#92400e] text-white px-6 py-2 rounded-full font-bold">Order Online</button>
    </nav>
    <div className="p-8">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#fef3c7]">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-20 flex flex-col justify-center bg-white">
            <h1 className="text-5xl font-serif font-bold text-[#451a03] leading-tight">{content.home?.headline}</h1>
            <p className="text-[#92400e]/70 mt-6 text-xl leading-relaxed">{content.home?.subtext}</p>
            <button className="mt-10 bg-[#f59e0b] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 self-start">{content.home?.cta}</button>
          </div>
          <div className="bg-[#fef3c7] min-h-[400px] flex items-center justify-center">
             <div className="text-8xl p-20 grayscale opacity-20">🏪</div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-serif font-bold text-[#451a03] mb-6">{content.about?.title}</h2>
          <p className="text-[#92400e]/80 leading-relaxed text-lg">{content.about?.text}</p>
        </div>
        <div className="md:col-span-2">
           <h3 className="text-3xl font-serif font-bold text-[#451a03] mb-8 text-center md:text-left">{content.services?.title}</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {(content.services?.items || []).map((s: string, i: number) => (
               <div key={i} className="aspect-square bg-white border border-[#fcd34d] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="text-3xl mb-3">🥖</div>
                 <h4 className="font-bold text-[#451a03] text-sm">{s}</h4>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
    <footer className="bg-[#451a03] text-white px-8 py-16">
       <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
         <div>
           <h2 className="text-2xl font-serif font-bold mb-4">{name}</h2>
           <p className="opacity-70 text-sm leading-relaxed max-w-sm">Serving our local community with the finest ingredients and a smile since 1995.</p>
         </div>
         <div className="text-right">
           <p className="font-bold text-lg mb-2">{content.contact?.phone}</p>
           <p className="opacity-70 mb-8">{content.contact?.email}</p>
           <p className="text-xs opacity-50">© {new Date().getFullYear()} Corner Shop Inc. All rights reserved.</p>
         </div>
       </div>
    </footer>
  </div>
);

export const BusinessTemplate5 = ({ name, content }: TemplateProps) => (
  <div className="font-serif min-h-full bg-white text-black">
    <header className="border-b border-black/10 px-12 py-8 flex items-center justify-between uppercase tracking-[0.2em] text-xs font-medium">
      <span className="font-bold text-lg tracking-[0.3em]">VANGUARD</span>
      <div className="flex gap-12">
        <span>Archives</span><span>Perspectives</span><span>Contact</span>
      </div>
    </header>
    <div className="px-12 py-32 text-center max-w-4xl mx-auto">
      <h1 className="text-7xl font-light tracking-tight leading-[1.1] text-black/90">{content.home?.headline}</h1>
      <p className="mt-12 text-xl italic text-black/50 max-w-xl mx-auto font-sans font-light leading-relaxed">{content.home?.subtext}</p>
      <div className="mt-16 inline-block border-b-2 border-black pb-2 text-sm uppercase tracking-widest font-sans font-bold cursor-pointer hover:opacity-70 transition-opacity">
        {content.home?.cta}
      </div>
    </div>
    <div className="px-12 py-32 border-t border-black/10 flex flex-col md:flex-row gap-20">
      <div className="md:w-1/3">
        <h2 className="text-xs uppercase tracking-[0.3em] font-sans font-bold mb-10 opacity-30">Our Mission</h2>
        <h3 className="text-4xl font-light mb-8 leading-tight">{content.about?.title}</h3>
        <p className="text-black/60 font-sans leading-relaxed text-lg">{content.about?.text}</p>
      </div>
      <div className="md:w-2/3">
        <h2 className="text-xs uppercase tracking-[0.3em] font-sans font-bold mb-10 opacity-30 text-right">Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {(content.services?.items || []).map((s: string, i: number) => (
            <div key={i} className="border-t border-black pt-6 group cursor-pointer">
              <span className="text-xs opacity-30 font-sans mb-4 block">0{i+1}</span>
              <h4 className="text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{s}</h4>
              <p className="font-sans text-black/40 text-sm leading-relaxed">Strategic guidance for discerning leadership in a complex global environment.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <footer className="bg-black text-white p-20 flex flex-col items-center text-center">
       <span className="text-4xl font-light tracking-[0.4em] mb-12">VANGUARD</span>
       <h2 className="text-xl italic mb-6 font-serif">{content.contact?.title}</h2>
       <p className="font-sans text-sm tracking-widest opacity-40 uppercase mb-20">{content.contact?.email} / {content.contact?.phone}</p>
       <p className="font-sans text-[10px] uppercase tracking-widest opacity-20">© {new Date().getFullYear()} Vanguard Consulting Group. All Rights Reserved.</p>
    </footer>
  </div>
);

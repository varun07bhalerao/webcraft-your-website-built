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

export const BlogTemplate1 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[#faf9f6] text-[#2c2c2c]">
     <nav className="border-b border-gray-200 px-8 lg:px-24 py-6 flex items-center justify-between sticky top-0 bg-[#faf9f6]/95 backdrop-blur z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-serif font-bold text-2xl tracking-tight">{name}</span>}
        <div className="hidden md:flex gap-8 text-sm text-gray-500 uppercase tracking-widest font-semibold">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-black cursor-pointer transition-colors cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
        <button className="text-xs uppercase tracking-widest font-bold border-b-2 border-transparent hover:border-black pb-1 transition-colors">Subscribe</button>
     </nav>

     <main className="max-w-4xl mx-auto px-8 py-24 md:py-32">
        <article className="border-b border-gray-200 pb-24 mb-24 text-center">
           <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#d97706] mb-8">Featured Story</div>
           <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">{content.home?.headline}</h1>
           <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mb-12">{content.home?.subtext}</p>
           <button className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
        </article>

        <section className="mb-24">
           <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-4">
              <h2 className="font-serif text-3xl font-bold">{content.about?.title}</h2>
           </div>
           <div className="prose prose-lg text-gray-600 font-serif leading-relaxed font-light mx-auto">
              <p className="indent-8 text-xl leading-[1.8]">{content.about?.text}</p>
              <p className="indent-8 mt-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
           </div>
        </section>

        <section className="mb-24">
           <div className="flex flex-col gap-12">
              <h2 className="font-serif text-3xl font-bold mb-4">{content.services?.title}</h2>
              {(content.services?.items || []).map((s: string, i: number) => (
                 <article key={i} className="group cursor-pointer flex flex-col md:flex-row gap-8 items-start hover:bg-white p-6 -mx-6 rounded-2xl transition-colors">
                    <div className="w-full md:w-32 aspect-[4/3] bg-gray-200 block shrink-0 overflow-hidden">
                       <div className="w-full h-full bg-gray-300 transform transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1">
                       <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-[#d97706] transition-colors">{s}</h3>
                       <p className="text-gray-500 font-light leading-relaxed mb-4 max-w-xl">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                       <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Read Essay →</div>
                    </div>
                 </article>
              ))}
           </div>
        </section>
     </main>

     <footer className="bg-black text-white px-8 lg:px-24 py-20 flex flex-col md:flex-row justify-between items-start md:items-center" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <div className="mb-12 md:mb-0">
           <h2 className="font-serif text-3xl font-bold tracking-tight mb-4">{name}</h2>
           <p className="text-sm text-gray-400 max-w-xs">{content.contact?.title} — independent publishing for the modern era.</p>
        </div>
        <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-gray-300">
           <a href={`mailto:${content.contact?.email}`} className="hover:text-white transition-colors">Email: {content.contact?.email}</a>
           <a href={`tel:${content.contact?.phone}`} className="hover:text-white transition-colors">Tel: {content.contact?.phone}</a>
        </div>
     </footer>
  </div>
);

export const BlogTemplate2 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-slate-50 text-slate-800">
     <nav className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-black text-2xl tracking-tighter text-slate-900">{name}</span>}
        <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="cursor-pointer hover:text-slate-900 border-b-2 border-transparent hover:border-slate-900 pb-1 cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
     </nav>

     <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
           <article className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 group cursor-pointer relative overflow-hidden flex flex-col justify-end min-h-[500px]">
              <div className="absolute inset-0 bg-slate-100 z-0">
                 <div className="w-full h-full bg-slate-200 transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10">
                 <div className="inline-block bg-white text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Editor's Pick</div>
                 <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 group-hover:underline decoration-white/50">{content.home?.headline}</h1>
                 <p className="text-xl text-slate-300 font-medium mb-8 max-w-2xl">{content.home?.subtext}</p>
                 <div className="flex items-center gap-4 text-white">
                    <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-white" />
                    <div>
                       <div className="font-bold text-sm">Alex Chen</div>
                       <div className="text-xs text-slate-400">10 min read</div>
                    </div>
                 </div>
              </div>
           </article>

           <div className="flex flex-col gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                 <h2 className="font-black text-xl mb-6 pb-4 border-b border-slate-100">{content.about?.title}</h2>
                 <p className="text-slate-600 leading-relaxed font-medium">{content.about?.text}</p>
              </div>
              
              <div className="bg-blue-600 text-white rounded-3xl p-8 shadow-lg flex-1 flex flex-col justify-center text-center">
                 <div className="text-4xl mb-6">📬</div>
                 <h3 className="font-black text-2xl mb-4">Never miss a story</h3>
                 <p className="text-blue-100 mb-6 text-sm">Join our newsletter to get weekly updates.</p>
                 <div className="flex flex-col gap-2">
                    <input type="email" placeholder="Email address" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none placeholder:text-blue-200 text-white" />
                    <button className="bg-white text-blue-600 font-bold rounded-xl px-4 py-3 hover:bg-blue-50 transition-colors">Subscribe</button>
                 </div>
              </div>
           </div>
        </div>

        <div className="mb-12 flex items-center justify-between pb-4 border-b border-slate-200">
           <h2 className="font-black text-3xl text-slate-900">{content.services?.title}</h2>
           <span className="text-sm font-bold text-slate-500 hover:text-slate-900 cursor-pointer">View All →</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {(content.services?.items || []).map((s: string, i: number) => (
              <article key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 group cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
                 <div className="aspect-[3/2] bg-slate-100 rounded-xl mb-6 overflow-hidden">
                    <div className="w-full h-full bg-slate-200 transition-transform group-hover:scale-105" />
                 </div>
                 <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Topic {i+1}</div>
                 <h3 className="text-xl font-bold leading-snug mb-4 group-hover:text-blue-600 transition-colors">{s}</h3>
                 <div className="text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-100 pt-4">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className=" cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
              </article>
           ))}
        </div>
     </div>

     <footer className="bg-slate-900 text-slate-400 py-16 px-8 text-center text-sm border-t-8 border-slate-800" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <h2 className="font-black text-2xl text-white mb-2">{name}</h2>
        <p className="mb-10 font-medium">Digital Magazine</p>
        <div className="flex justify-center gap-6 mb-12 border-y border-slate-800 py-6 max-w-md mx-auto">
           <a href={`mailto:${content.contact?.email}`} className="hover:text-white transition-colors">{content.contact?.email}</a>
           <a href={`tel:${content.contact?.phone}`} className="hover:text-white transition-colors">{content.contact?.phone}</a>
        </div>
        <p className="font-bold text-slate-600 uppercase tracking-widest text-xs">© {new Date().getFullYear()} All Rights Reserved</p>
     </footer>
  </div>
);

export const BlogTemplate3 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-serif min-h-screen bg-[#fdf8f5] text-[#5c4a43]">
     <div className="py-12 md:py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[#e8dbce] mx-auto mb-8 flex items-center justify-center text-4xl shadow-inner border-4 border-white">
           ✍️
        </div>
        <h1 className="text-4xl md:text-5xl italic text-[#5c4a43] mb-4">{name}</h1>
        <p className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-[#b5a396]">Personal Thoughts & Reflections</p>
     </div>
     
     <nav className="border-y border-[#e8dbce] max-w-3xl mx-auto flex justify-center py-4 gap-8 md:gap-16 font-sans text-xs uppercase tracking-widest font-bold text-[#b5a396] sticky top-0 bg-[#fdf8f5] z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="hover:text-[#5c4a43] cursor-pointer cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}
</nav>

     <main className="max-w-2xl mx-auto px-8 py-20 pb-0">
        <article className="mb-32">
           <div className="text-center mb-12">
              <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#b5a396] mb-8 flex items-center justify-center gap-4">
                 <span className="w-8 h-px bg-[#e8dbce]" />
                 A New Beginning
                 <span className="w-8 h-px bg-[#e8dbce]" />
              </div>
              <h1 className="text-4xl md:text-6xl text-[#5c4a43] leading-[1.2] mb-10">{content.home?.headline}</h1>
              <p className="text-xl md:text-2xl italic text-[#8c7a6e] font-light leading-relaxed mb-12">"{content.home?.subtext}"</p>
           </div>
           
           <div className="prose prose-stone prose-lg mx-auto font-serif text-[#5c4a43] font-light leading-[2]">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
                 {content.about?.text}
              </p>
              <p>
                 I sit here with my morning coffee, watching the rain trace paths across the windowpane. There's a certain quietitude in mornings like this, a pause before the cacophony of the day begins. It's in these moments that thoughts surface most clearly.
              </p>
              <div className="my-16 text-center italic text-2xl text-[#b5a396]">...</div>
              <p>
                 As we navigate through the complexities of our daily lives, it becomes increasingly important to carve out sanctuaries of stillness. This space—this digital journal—is my attempt at such a sanctuary. A place to document the ephemeral, the mundane, and the profound.
              </p>
           </div>
           
           <div className="mt-16 text-center">
              <button className="bg-transparent border border-[#b5a396] text-[#b5a396] px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-[#b5a396] hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
           </div>
        </article>
     </main>

     <div className="bg-[#f5ece4] py-24 px-8 border-y border-[#e8dbce]">
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl text-center italic mb-16 text-[#5c4a43]">Recent Entries // {content.services?.title}</h2>
           <div className="space-y-16 relative">
              <div className="absolute top-0 bottom-0 left-[27px] w-px bg-[#e8dbce]" />
              {(content.services?.items || []).map((s: string, i: number) => (
                 <article key={i} className="flex gap-8 relative z-10 group cursor-pointer">
                    <div className="w-14 h-14 rounded-full border border-[#e8dbce] bg-[#f5ece4] flex items-center justify-center font-sans text-xs font-bold text-[#b5a396] shrink-0 group-hover:bg-[#5c4a43] group-hover:text-white transition-colors">
                       14<br/>JAN
                    </div>
                    <div className="pt-2">
                       <h3 className="text-2xl mb-3 text-[#5c4a43] group-hover:underline decoration-[#e8dbce] underline-offset-4">{s}</h3>
                       <p className="text-[#8c7a6e] font-light leading-relaxed italic line-clamp-2">A reflection on the passage of time and the beauty found in ordinary moments. Why we should hold onto the little things that bring us joy daily.</p>
                    </div>
                 </article>
              ))}
           </div>
        </div>
     </div>

     <footer className="text-center py-20 px-8" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <h2 className="text-2xl mb-8 text-[#5c4a43]">{content.contact?.title}</h2>
        <div className="font-sans text-sm tracking-widest text-[#8c7a6e] flex flex-col gap-4">
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className=" cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}</div>
        <div className="mt-16 w-16 h-px bg-[#e8dbce] mx-auto mb-8" />
        <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#b5a396]">© {new Date().getFullYear()} {name}</div>
     </footer>
  </div>
);

export const BlogTemplate4 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-white text-black border-8 md:border-[16px] border-black pb-0 relative">
     <header className="border-b-4 border-black border-double pt-8 pb-4 px-4 md:px-8 bg-white sticky top-0 z-50" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <div className="flex justify-between items-center mb-6">
           <div className="font-bold text-xs uppercase tracking-widest hidden md:block">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>
           <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> Live Now
           </div>
           <div className="font-bold text-xs uppercase tracking-widest hidden md:block">Issue No. 402</div>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-center tracking-tighter uppercase leading-[0.8]">{name}</h1>
     </header>

     <nav className="border-b-4 border-black px-4 md:px-8 py-3 bg-white flex overflow-x-auto gap-8 sm:gap-12 text-sm font-bold uppercase tracking-widest hide-scrollbar" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        {pages?.map(p => (
           <span 
              key={p.id} 
              onClick={(e) => { e.preventDefault(); onNavigate?.(p.id); }} 
              className="shrink-0 hover:bg-black hover:text-white px-2 transition-colors cursor-pointer cursor-pointer hover:opacity-80 transition-opacity"
           >
              {p.name}
           </span>
        ))}
</nav>

     <main className="p-4 md:p-8">
        <div className="grid lg:grid-cols-4 gap-8 md:gap-12 mb-12 border-b border-black pb-12">
           <article className="lg:col-span-3 border-r-0 lg:border-r border-black lg:pr-12 group cursor-pointer">
              <div className="font-bold text-sm tracking-widest uppercase mb-4 text-red-600 bg-red-50 inline-block px-2">Breaking</div>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-[0.9] tracking-tight mb-6 group-hover:underline underline-offset-8">{content.home?.headline}</h1>
              <p className="text-xl md:text-2xl text-gray-700 font-serif leading-snug mb-8">{content.home?.subtext}</p>
              
              <div className="flex items-center justify-between border-y border-gray-300 py-4 mb-8">
                 <div className="text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-red-600 transition-colors">{content.home?.cta}</div>
                 <div className="text-xs font-bold uppercase text-gray-500">By Senior Editor • 2 Hours Ago</div>
              </div>
              
              <div className="aspect-[21/9] bg-gray-200 w-full overflow-hidden border border-black p-1">
                 <div className="w-full h-full bg-gray-300 grayscale transition-transform duration-700 group-hover:scale-105" />
              </div>
           </article>
           
           <aside className="lg:col-span-1 space-y-8">
              <h2 className="text-2xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-tight flex justify-between items-center">
                 Trending <div className="text-red-600 text-lg">↗</div>
              </h2>
              <div className="space-y-6">
                 {(content.services?.items || []).map((s: string, i: number) => (
                    <article key={i} className="group cursor-pointer border-b border-gray-200 pb-6 last:border-0">
                       <div className="text-4xl font-black text-gray-200 mb-2 font-serif leading-none opacity-50 block md:hidden lg:block float-left mr-4 pt-1">{i+1}</div>
                       <h3 className="font-bold text-lg leading-tight group-hover:underline">{s}</h3>
                       <div className="text-xs font-bold text-gray-500 mt-2 uppercase">Business • 45m ago</div>
                    </article>
                 ))}
              </div>
           </aside>
        </div>

        <section className="bg-gray-50 p-8 md:p-12 border border-black text-center max-w-4xl mx-auto mb-20">
           <h2 className="text-3xl font-black uppercase mb-6 tracking-tight">{content.about?.title}</h2>
           <p className="text-xl font-serif leading-relaxed text-gray-700 mb-8 max-w-2xl mx-auto">{content.about?.text}</p>
           <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 border-2 border-black hover:border-gray-800 transition-all">Subscribe to Newsletter</button>
        </section>
     </main>

     <footer className="border-t-4 border-black p-8 md:p-12 text-center bg-black text-white relative flex flex-col justify-end min-h-[400px]" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-2 opacity-5 absolute top-12 left-0 right-0">{name}</h2>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto w-full border-t border-gray-800 pt-12">
           <div className="text-left">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-gray-400">{content.contact?.title}</h3>
              <p className="font-medium mb-4 text-xl hover:text-gray-300 transition-colors cursor-pointer">{content.contact?.email}</p>
              <p className="font-medium text-xl hover:text-gray-300 transition-colors cursor-pointer">{content.contact?.phone}</p>
           </div>
           <div className="text-left md:text-right">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-gray-400">Sections</h3>
              <ul className="space-y-2 font-bold uppercase">
                 <li className="hover:text-red-500 cursor-pointer transition-colors">Op-Eds</li>
                 <li className="hover:text-red-500 cursor-pointer transition-colors">Letters</li>
                 <li className="hover:text-red-500 cursor-pointer transition-colors">Classifieds</li>
              </ul>
           </div>
        </div>
        <div className="mt-20 pt-8 border-t border-gray-800 font-bold text-xs uppercase tracking-widest text-gray-600 relative z-10">
           © {new Date().getFullYear()} {name} PORTAL. ALL RIGHTS RESERVED.
        </div>
     </footer>
  </div>
);

export const BlogTemplate5 = ({ name, logo, pages, content, onNavigate, onGlobalEdit }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[#111] text-white overflow-hidden relative">
     <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-zinc-900 object-cover opacity-60 mix-blend-luminosity scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
     </div>

     <nav className="relative z-20 px-8 py-8 flex items-center justify-between mix-blend-difference" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        {logo ? <img src={logo} alt={name} className="h-8 object-contain" /> : <span className="font-bold text-xl uppercase tracking-[0.3em] font-serif italic">{name}</span>}
        <button className="text-xs uppercase tracking-[0.2em] font-bold border border-white/30 hover:bg-white hover:text-black px-6 py-2 transition-colors" onClick={(e) => { e.preventDefault(); if (content.links?.home_cta) onNavigate?.(content.links.home_cta); }}>{content.home?.cta}</button>
     </nav>

     <main className="relative z-10 min-h-[80vh] flex flex-col justify-end px-8 md:px-20 pb-20 pt-32">
        <div className="max-w-5xl">
           <div className="text-sm font-bold uppercase tracking-[0.4em] mb-8 text-zinc-400 flex items-center gap-4">
              <span className="w-12 h-px bg-zinc-400" />
              Featured Editorial
           </div>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8] mb-12 hover:tracking-normal transition-all duration-1000 uppercase font-serif">
              {content.home?.headline}
           </h1>
           <p className="text-xl md:text-3xl font-light text-zinc-300 max-w-2xl leading-relaxed italic border-l-2 border-white/20 pl-8 ml-2">
              {content.home?.subtext}
           </p>
        </div>
     </main>

     <div className="relative z-10 bg-black py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
           <div className="md:w-1/3 border-t border-white/20 pt-8">
              <h2 className="text-3xl font-serif italic mb-6">{content.about?.title}</h2>
              <p className="text-zinc-400 leading-relaxed font-light text-lg">{content.about?.text}</p>
           </div>
           <div className="md:w-2/3">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] mb-12 text-zinc-500">{content.services?.title}</h2>
              <div className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x">
                 {(content.services?.items || []).map((s: string, i: number) => (
                    <article key={i} className="min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-zinc-900 flex-shrink-0 snap-center relative group cursor-pointer overflow-hidden border border-white/10">
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                       <div className="w-full h-full bg-zinc-800 transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-80" />
                       <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Vol 0{i+1}</div>
                          <h3 className="text-2xl font-serif font-bold italic group-hover:text-white text-zinc-300 transition-colors line-clamp-2">{s}</h3>
                       </div>
                    </article>
                 ))}
                 
                 <div className="min-w-[300px] md:min-w-[400px] aspect-[4/5] bg-transparent border border-white/20 flex-shrink-0 snap-center flex flex-col items-center justify-center text-center p-12 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">+</div>
                    <div className="font-serif italic text-xl">View All Publications</div>
                 </div>
              </div>
           </div>
        </div>
     </div>

     <footer className="relative z-10 border-t border-white/10 px-8 py-20 bg-black flex flex-col items-center text-center" onClick={(e) => { e.stopPropagation(); onGlobalEdit?.('contact'); }}>
        <h2 className="font-serif italic text-4xl mb-12">{content.contact?.title}</h2>
        <div className="flex flex-col md:flex-row gap-12 font-bold text-xs uppercase tracking-[0.3em] text-zinc-500 mb-20">
           <a href={`mailto:${content.contact?.email}`} className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-2">{content.contact?.email}</a>
           <a href={`tel:${content.contact?.phone}`} className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-2">{content.contact?.phone}</a>
        </div>
        <span className="font-serif italic text-zinc-600">© {new Date().getFullYear()} {name}. All Rights Reserved.</span>
     </footer>
  </div>
);

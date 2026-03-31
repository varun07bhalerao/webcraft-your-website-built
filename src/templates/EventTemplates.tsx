import React from 'react';
import { WebsiteType } from '@/contexts/ProjectContext';

interface TemplateProps {
  name: string;
  content: Record<string, any>;
}

export const EventTemplate1 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[hsl(280,30%,8%)] text-white">
    <nav className="px-8 py-6 flex items-center justify-between border-b border-white/10 sticky top-0 bg-[hsl(280,30%,8%)]/80 backdrop-blur-md z-50">
      <span className="font-black text-2xl tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[hsl(280,65%,55%)] to-[hsl(320,65%,55%)]">{name}</span>
      <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest opacity-80">
        <span className="hover:text-[hsl(280,65%,55%)] cursor-pointer transition-colors">Lineup</span>
        <span className="hover:text-[hsl(280,65%,55%)] cursor-pointer transition-colors">Tickets</span>
        <span className="hover:text-[hsl(280,65%,55%)] cursor-pointer transition-colors">Info</span>
      </div>
      <button className="bg-gradient-to-r from-[hsl(280,65%,55%)] to-[hsl(320,65%,55%)] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">{content.home?.cta}</button>
    </nav>

    <div className="relative overflow-hidden py-32 px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,theme(colors.purple.600/0.4),transparent_60%)] blur-3xl" />
       <div className="relative z-10 w-full max-w-5xl">
         <h1 className="text-6xl md:text-[8rem] font-black leading-none tracking-tighter mb-6 uppercase">
            {content.home?.headline}
         </h1>
         <p className="text-2xl md:text-3xl text-purple-200 font-light mb-12 uppercase tracking-[0.3em]">{content.home?.subtext}</p>
         
         <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
               <div className="text-3xl font-black mb-2 text-purple-400">15-17</div>
               <div className="text-xs uppercase tracking-widest opacity-60">AUG 2026</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
               <div className="text-3xl font-black mb-2 text-pink-400">3</div>
               <div className="text-xs uppercase tracking-widest opacity-60">STAGES</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
               <div className="text-3xl font-black mb-2 text-fuchsia-400">50+</div>
               <div className="text-xs uppercase tracking-widest opacity-60">ARTISTS</div>
            </div>
         </div>
       </div>
    </div>

    <div className="px-8 py-32 bg-[hsl(280,40%,6%)] border-y border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto">
         <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
               <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{content.about?.title}</h2>
               <p className="text-xl leading-relaxed text-gray-400 font-light">{content.about?.text}</p>
            </div>
            <div className="md:w-1/2 w-full aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-full border border-white/10 flex items-center justify-center p-12">
               <div className="w-full h-full rounded-full border border-purple-500/30 border-dashed animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <div className="w-2/3 h-2/3 rounded-full border border-pink-500/50 animate-[spin_15s_linear_infinite_reverse] text-6xl flex items-center justify-center">🎵</div>
               </div>
            </div>
         </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
       <div className="text-center mb-24">
         <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">{content.services?.title}</h2>
         <div className="w-24 h-2 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
       </div>
       <div className="grid md:grid-cols-2 gap-8">
          {(content.services?.items || []).map((s: string, i: number) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-[hsl(280,40%,12%)] border border-white/5 p-8 md:p-12 hover:border-purple-500/50 transition-colors">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full group-hover:bg-pink-600/30 transition-colors" />
               <div className="relative z-10 flex justify-between items-end h-full min-h-[160px]">
                 <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight w-2/3">{s}</h3>
                 <div className="text-sm font-bold uppercase tracking-widest text-purple-400">Headliner</div>
               </div>
            </div>
          ))}
       </div>
    </div>

    <footer className="bg-black text-center pt-32 pb-16 px-8 relative z-10 border-t border-white/10">
       <h2 className="text-4xl font-black uppercase tracking-[0.5em] mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{name}</h2>
       <div className="flex flex-col items-center gap-6 mb-16">
          <div className="text-3xl font-bold uppercase">{content.contact?.title}</div>
          <div className="flex gap-8 text-xl text-gray-400">
             <a href={`mailto:${content.contact?.email}`} className="hover:text-white transition-colors">{content.contact?.email}</a>
             <span>/</span>
             <a href={`tel:${content.contact?.phone}`} className="hover:text-white transition-colors">{content.contact?.phone}</a>
          </div>
       </div>
       <div className="text-xs uppercase tracking-widest text-gray-600 font-bold">
          © {new Date().getFullYear()} {name} FESTIVAL. ALL RIGHTS RESERVED.
       </div>
    </footer>
  </div>
);

export const EventTemplate2 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-slate-50 text-slate-800">
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 flex items-center justify-between sticky top-0 z-50 shadow-md">
       <span className="font-black text-2xl tracking-tighter flex items-center gap-2">
         <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-serif italic text-xl">C</div>
         {name}
       </span>
       <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-white/80">
         <span className="hover:text-white cursor-pointer transition-colors">Speakers</span>
         <span className="hover:text-white cursor-pointer transition-colors">Schedule</span>
         <span className="hover:text-white cursor-pointer transition-colors">Venue</span>
       </div>
       <button className="bg-white text-indigo-700 px-6 py-2 rounded font-black uppercase text-sm hover:shadow-lg transition-transform hover:-translate-y-0.5">{content.home?.cta}</button>
    </nav>
    
    <div className="px-8 py-24 md:py-32 bg-white border-b border-slate-200 flex flex-col items-center text-center relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.indigo.500/0.05),transparent_50%)]" />
       
       <div className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8 border border-indigo-200">
          Tech Conference {new Date().getFullYear()}
       </div>
       <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-5xl mb-8">
          {content.home?.headline}
       </h1>
       <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mb-12">
          {content.home?.subtext}
       </p>
       
       <div className="flex flex-col md:flex-row gap-6 justify-center text-left w-full max-w-3xl">
          <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl flex-1 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl">📅</div>
             <div>
                <div className="font-bold text-slate-900">Oct 24-25</div>
                <div className="text-sm text-slate-500">2 Days of Insights</div>
             </div>
          </div>
          <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl flex-1 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">📍</div>
             <div>
                <div className="font-bold text-slate-900">Expo Center</div>
                <div className="text-sm text-slate-500">San Francisco, CA</div>
             </div>
          </div>
       </div>
    </div>

    <div className="max-w-6xl mx-auto px-8 py-24">
       <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight mb-6">{content.about?.title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{content.about?.text}</p>
          </div>
          <div className="bg-slate-900 text-white p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-30" />
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30" />
             
             <div className="text-6xl mb-8 relative z-10">🎙️</div>
             <h3 className="text-3xl font-bold mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">World-Class Speakers</h3>
             <p className="text-slate-300 leading-relaxed relative z-10">Join industry leaders and innovators for two days of keynotes, workshops, and networking.</p>
          </div>
       </div>
    </div>

    <div className="bg-slate-100 border-y border-slate-200 py-32 px-8">
       <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900">{content.services?.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(content.services?.items || []).map((s: string, i: number) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-4 pb-4 border-b border-slate-100">Keynote 0{i+1}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">{s}</h3>
                  <div className="flex items-center gap-3 mt-8">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400" />
                     <div>
                        <div className="text-sm font-bold text-slate-900">Expert Speaker</div>
                        <div className="text-xs text-slate-500">Industry Leader</div>
                     </div>
                  </div>
               </div>
            ))}
          </div>
       </div>
    </div>

    <footer className="bg-white py-16 px-8 text-center text-slate-500">
       <h2 className="font-black text-3xl text-slate-900 mb-8">{content.contact?.title}</h2>
       <div className="flex justify-center items-center gap-6 mb-12">
          <div className="bg-slate-50 px-6 py-3 rounded-full border border-slate-200 font-medium">📬 {content.contact?.email}</div>
          <div className="bg-slate-50 px-6 py-3 rounded-full border border-slate-200 font-medium">📱 {content.contact?.phone}</div>
       </div>
       <div className="h-px bg-slate-200 max-w-xs mx-auto mb-8" />
       <p className="text-sm font-bold uppercase tracking-widest">© {new Date().getFullYear()} {name}. All Rights Reserved.</p>
    </footer>
  </div>
);

export const EventTemplate3 = ({ name, content }: TemplateProps) => (
  <div className="font-serif min-h-screen bg-[#fdfbf7] text-[#4a4a4a]">
    <nav className="p-8 text-center flex flex-col items-center">
       <h1 className="text-3xl italic text-[#c3a995] mb-2">{name}</h1>
       <div className="w-12 h-px bg-[#c3a995]" />
    </nav>
    
    <div className="py-24 px-8 text-center bg-[#f7f2ed] m-4 md:m-12 rounded-[3rem] shadow-sm border border-[#f3e8e0] relative overflow-hidden">
       {/* Decorative flowers/leaves placeholders */}
       <div className="absolute top-0 left-0 w-32 h-32 opacity-20 text-6xl -translate-x-1/2 -translate-y-1/2">🌿</div>
       <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 text-6xl translate-x-1/2 translate-y-1/2">🌸</div>
       
       <div className="text-xs uppercase tracking-[0.4em] text-[#8c8c8c] mb-8 font-sans font-bold">Please join us to celebrate</div>
       <h1 className="text-5xl md:text-7xl mb-8 text-[#5a504b] leading-tight px-4">{content.home?.headline}</h1>
       <p className="text-xl md:text-2xl text-[#8c8c8c] italic mb-12 max-w-2xl mx-auto">{content.home?.subtext}</p>
       
       <button className="bg-[#c3a995] text-white px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] hover:bg-[#a68c76] transition-colors rounded-sm">{content.home?.cta}</button>
    </div>

    <div className="max-w-4xl mx-auto px-8 py-24 text-center">
       <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#c3a995] mb-6 border-b border-[#f3e8e0] pb-6 inline-block">{content.about?.title}</h2>
       <p className="text-2xl leading-relaxed text-[#5a504b] mt-6">{content.about?.text}</p>
    </div>

    <div className="bg-white py-32 px-8 border-y border-[#f3e8e0]">
       <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-4xl mb-16 text-[#5a504b] italic">{content.services?.title}</h2>
          
          <div className="flex flex-col gap-12 max-w-2xl mx-auto relative">
             <div className="absolute top-8 bottom-8 left-12 w-px bg-[#f3e8e0] hidden md:block" />
             {(content.services?.items || []).map((s: string, i: number) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10 text-center md:text-left">
                   <div className="w-24 h-24 rounded-full bg-[#f7f2ed] border border-[#f3e8e0] flex items-center justify-center font-sans font-bold text-[#c3a995] text-sm tracking-widest uppercase shrink-0">
                      0{i+1}
                   </div>
                   <div className="pt-2 md:pt-8 bg-white md:bg-transparent px-4">
                      <h3 className="text-2xl text-[#5a504b] mb-4">{s}</h3>
                      <p className="text-[#8c8c8c] font-sans text-sm leading-relaxed max-w-sm">We are so excited to share this special moment of our celebration with you.</p>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>

    <footer className="py-24 px-8 text-center bg-[#f7f2ed]">
       <div className="w-16 h-16 rounded-full border border-[#c3a995] mx-auto mb-8 flex items-center justify-center text-xl italic text-[#c3a995]">RSVP</div>
       <h2 className="text-3xl text-[#5a504b] mb-8">{content.contact?.title}</h2>
       <div className="font-sans text-sm text-[#8c8c8c] tracking-widest uppercase space-y-4 mb-16">
          <div>Email: {content.contact?.email}</div>
          <div>Phone: {content.contact?.phone}</div>
       </div>
       <h1 className="text-2xl italic text-[#c3a995]">{name}</h1>
    </footer>
  </div>
);

export const EventTemplate4 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[#f0fdf4] text-[#14532d]">
     <nav className="bg-[#16a34a] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <span className="font-black text-2xl tracking-tight">{name}</span>
        <div className="hidden md:flex gap-6 font-bold text-sm bg-white/10 px-6 py-2 rounded-full">
           <span className="hover:text-green-200 cursor-pointer">About</span>
           <span className="hover:text-green-200 cursor-pointer">Agenda</span>
           <span className="hover:text-green-200 cursor-pointer">Location</span>
        </div>
        <button className="bg-white text-[#16a34a] px-5 py-2 rounded-full font-black text-sm uppercase tracking-wider">{content.home?.cta}</button>
     </nav>

     <div className="px-6 py-16 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#16a34a] px-4 py-2 rounded-full font-bold text-sm mb-8 border border-[#bbf7d0]">
           <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" /> Community Meetup
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tighest tracking-tighter text-[#14532d] max-w-4xl">{content.home?.headline}</h1>
        <p className="text-xl md:text-3xl text-[#15803d] font-semibold max-w-2xl leading-snug mb-12">{content.home?.subtext}</p>
     </div>

     <div className="max-w-5xl mx-auto px-6 mb-24 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border-2 border-[#dcfce7]">
           <h2 className="text-3xl font-black mb-6 text-[#14532d] flex items-center gap-3">
             <div className="w-10 h-10 bg-[#bbf7d0] rounded-full flex items-center justify-center text-2xl">👋</div>
             {content.about?.title}
           </h2>
           <p className="text-[#15803d] text-lg leading-relaxed font-medium">{content.about?.text}</p>
        </div>
        
        <div className="bg-[#16a34a] text-white p-12 rounded-[2rem] shadow-xl transform md:translate-y-8">
           <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">⚡</div>
             {content.services?.title}
           </h2>
           <div className="space-y-4">
              {(content.services?.items || []).map((s: string, i: number) => (
                 <div key={i} className="bg-white/10 p-4 rounded-xl font-bold flex items-center gap-4">
                    <span className="bg-white text-[#16a34a] w-8 h-8 rounded-full flex items-center justify-center shrink-0">0{i+1}</span>
                    {s}
                 </div>
              ))}
           </div>
        </div>
     </div>

     <footer className="bg-white border-t border-[#dcfce7] pt-20 pb-12 px-6 text-center mt-32">
        <div className="w-20 h-20 bg-[#dcfce7] rounded-full mx-auto mb-8 flex items-center justify-center text-3xl pb-1">📍</div>
        <h2 className="text-3xl font-black mb-4 text-[#14532d]">{content.contact?.title}</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-16">
           <a href={`mailto:${content.contact?.email}`} className="text-xl font-bold text-[#16a34a] hover:underline bg-[#f0fdf4] px-6 py-2 rounded-full">{content.contact?.email}</a>
           <a href={`tel:${content.contact?.phone}`} className="text-xl font-bold text-[#16a34a] hover:underline bg-[#f0fdf4] px-6 py-2 rounded-full">{content.contact?.phone}</a>
        </div>
        <div className="text-sm font-bold text-[#15803d]/50 uppercase tracking-widest">
           {name} © {new Date().getFullYear()} — SEE YOU THERE!
        </div>
     </footer>
  </div>
);

export const EventTemplate5 = ({ name, content }: TemplateProps) => (
  <div className="font-sans min-h-screen bg-[#f8f9fa] text-[#212529]">
     <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="font-bold text-xl tracking-tight flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
           {name}
        </span>
        <div className="hidden md:flex gap-4 text-sm font-semibold text-gray-500 bg-gray-100 p-1 rounded-lg">
           <span className="bg-white px-4 py-1.5 rounded-md shadow-sm text-gray-900 cursor-pointer">Overview</span>
           <span className="px-4 py-1.5 rounded-md hover:text-gray-900 cursor-pointer">Presenters</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow text-sm font-bold transition-colors">{content.home?.cta}</button>
     </nav>

     <div className="px-8 py-20 bg-white border-b border-gray-200">
       <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
             <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 pb-2 border-b border-blue-100 inline-block">Free Online Webinar</div>
             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">{content.home?.headline}</h1>
             <p className="text-xl text-gray-500 leading-relaxed font-light mb-8">{content.home?.subtext}</p>
             <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-200 rounded-lg max-w-md">
                <div className="w-12 h-12 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-xl font-bold">12</div>
                <div>
                  <div className="font-bold text-gray-900">Starts in 12 hours</div>
                  <div className="text-sm text-gray-500">Live Q&A Included</div>
                </div>
             </div>
          </div>
          <div className="w-full md:w-[400px] shrink-0 bg-gray-900 rounded-xl p-2 shadow-2xl relative">
             <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
             </div>
             <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 text-white group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center pl-1 group-hover:scale-110 group-hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
             </div>
          </div>
       </div>
     </div>

     <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-3 gap-12">
           <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.about?.title}</h2>
              <div className="prose text-gray-600 leading-relaxed space-y-4">
                 <p>{content.about?.text}</p>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">{content.services?.title}</h2>
              <ul className="space-y-4">
                 {(content.services?.items || []).map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 bg-white p-4 border border-gray-200 rounded-lg">
                       <span className="text-green-500 mt-0.5">✓</span>
                       <span className="font-semibold text-gray-800">{s}</span>
                    </li>
                 ))}
              </ul>
           </div>
           
           <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
                 <h3 className="font-bold text-lg mb-4">{content.contact?.title}</h3>
                 <div className="text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">For any questions regarding the webinar, please reach out to our team.</div>
                 <div className="space-y-3 font-medium text-sm">
                    <a href={`mailto:${content.contact?.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                      ✉️ {content.contact?.email}
                    </a>
                    <a href={`tel:${content.contact?.phone}`} className="flex items-center gap-2 text-gray-800">
                      📞 {content.contact?.phone}
                    </a>
                 </div>
              </div>
           </div>
        </div>
     </div>

     <footer className="bg-gray-900 text-gray-400 py-12 px-8 text-center text-sm border-t-4 border-blue-600">
        <p className="font-bold text-white mb-2">{name} Webinar Platform</p>
        <p>© {new Date().getFullYear()} All rights reserved. Video content is recorded for quality purposes.</p>
     </footer>
  </div>
);

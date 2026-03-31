import { useNavigate, useParams } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { Globe, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const templateData: Record<WebsiteType, { name: string; desc: string; preview: React.ReactNode }[]> = {
  business: [
    { name: 'Corporate Pro', desc: 'Clean grid layout with structured sections', preview: <BusinessPreview1 /> },
    { name: 'Enterprise', desc: 'Bold hero with service cards', preview: <BusinessPreview2 /> },
    { name: 'Startup Tech', desc: 'Dark mode with neon accents', preview: <BusinessPreview3 /> },
    { name: 'Local Shop', desc: 'Warm layout with location focus', preview: <BusinessPreview4 /> },
    { name: 'Consultant', desc: 'High-end minimal layout', preview: <BusinessPreview5 /> },
  ],
  portfolio: [
    { name: 'Creative Studio', desc: 'Large images with asymmetric grid', preview: <PortfolioPreview1 /> },
    { name: 'Minimal Folio', desc: 'Typography-focused personal brand', preview: <PortfolioPreview2 /> },
    { name: 'Dev Folio', desc: 'Code-editor inspired dark theme', preview: <PortfolioPreview3 /> },
    { name: 'Photography', desc: 'Edge-to-edge image grid', preview: <PortfolioPreview4 /> },
    { name: 'Modern Dark', desc: 'Sleek dark mode with gradient text', preview: <PortfolioPreview5 /> },
  ],
  education: [
    { name: 'Academy', desc: 'Structured content with soft colors', preview: <EducationPreview1 /> },
    { name: 'LearnHub', desc: 'Card-based course layout', preview: <EducationPreview2 /> },
    { name: 'Playful Kids', desc: 'Bright colors for early learning', preview: <EducationPreview3 /> },
    { name: 'University', desc: 'Classic traditional layout', preview: <EducationPreview4 /> },
    { name: 'Tech Bootcamp', desc: 'High contrast modern typography', preview: <EducationPreview5 /> },
  ],
  event: [
    { name: 'Festival', desc: 'Vibrant gradients with bold hero', preview: <EventPreview1 /> },
    { name: 'Conference', desc: 'Dynamic speaker & schedule layout', preview: <EventPreview2 /> },
    { name: 'Wedding', desc: 'Elegant soft pastels', preview: <EventPreview3 /> },
    { name: 'Meetup', desc: 'Casual community layout', preview: <EventPreview4 /> },
    { name: 'Webinar', desc: 'Focus on presentation area', preview: <EventPreview5 /> },
  ],
  blog: [
    { name: 'Editorial', desc: 'Content-first minimal design', preview: <BlogPreview1 /> },
    { name: 'Magazine', desc: 'Rich article cards layout', preview: <BlogPreview2 /> },
    { name: 'Personal Diary', desc: 'Cozy layout with soft colors', preview: <BlogPreview3 /> },
    { name: 'News Portal', desc: 'Dense grid for high-volume content', preview: <BlogPreview4 /> },
    { name: 'Photo Journal', desc: 'Immersive full-bleed images', preview: <BlogPreview5 /> },
  ],
};

const WizardTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, updateProject, projects, setCurrentProject } = useProjects();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (id && (!currentProject || currentProject.id !== id)) {
      const p = projects.find(proj => proj.id === id);
      if (p) setCurrentProject(p);
    }
  }, [id, currentProject, projects, setCurrentProject]);

  const activeProject = currentProject?.id === id ? currentProject : projects.find(p => p.id === id);
  const type = activeProject?.type || 'business';
  const templates = templateData[type];

  const handleContinue = () => {
    if (selected === null || !id) return;
    updateProject(id, { template: selected });
    navigate(`/editor/${id}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg">WebCraft</span>
          <span className="ml-auto text-sm text-muted-foreground">Step 3 of 3</span>
        </div>

        <h1 className="text-3xl font-display font-bold mb-2">Choose a Template</h1>
        <p className="text-muted-foreground mb-10">
          Select a <span className="capitalize font-medium text-foreground">{type}</span> template to start with
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`group text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                selected === i ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'
              } animate-fade-in`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[16/10] bg-muted/50 overflow-hidden relative">
                <div className="transform scale-[0.5] origin-top-left w-[200%] h-[200%]">
                  {t.preview}
                </div>
                {selected === i && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={handleContinue} disabled={selected === null} className="gradient-bg text-primary-foreground h-12 px-8 font-semibold gap-2">
            Start Editing
          </Button>
        </div>
      </div>
    </div>
  );
};

// Template preview components - each visually distinct

function BusinessPreview1() {
  return (
    <div className="bg-card w-full h-full font-sans text-[10px]">
      <div className="bg-[hsl(215,70%,50%)] text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">BizCorp</span>
        <div className="flex gap-3 text-[8px]">
          <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
        </div>
      </div>
      <div className="bg-[hsl(215,70%,95%)] px-4 py-8 text-center">
        <div className="text-lg font-bold text-[hsl(215,70%,30%)]">Professional Solutions</div>
        <div className="text-[8px] text-muted-foreground mt-1">Growing your business with excellence</div>
        <div className="mt-3 inline-block bg-[hsl(215,70%,50%)] text-primary-foreground px-3 py-1 rounded text-[8px]">Get Started</div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {['Consulting', 'Marketing', 'Finance'].map(s => (
          <div key={s} className="bg-muted/50 rounded p-2 text-center">
            <div className="w-4 h-4 rounded bg-[hsl(215,70%,50%)]/20 mx-auto mb-1" />
            <div className="font-semibold text-[8px]">{s}</div>
          </div>
        ))}
      </div>
      <div className="bg-[hsl(215,70%,15%)] text-primary-foreground px-4 py-3 text-[7px]">© BizCorp 2024</div>
    </div>
  );
}

function BusinessPreview2() {
  return (
    <div className="bg-card w-full h-full font-sans text-[10px]">
      <div className="bg-[hsl(220,25%,15%)] text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">Enterprise+</span>
        <div className="flex gap-3 text-[8px]"><span>Solutions</span><span>About</span><span>Contact</span></div>
      </div>
      <div className="bg-gradient-to-r from-[hsl(215,70%,50%)] to-[hsl(220,60%,40%)] px-4 py-10 text-primary-foreground">
        <div className="text-xl font-bold">Transform Your Business</div>
        <div className="text-[9px] opacity-80 mt-1 max-w-[60%]">Enterprise solutions for the modern world</div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {['Strategy', 'Innovation', 'Growth', 'Security'].map(s => (
          <div key={s} className="border border-border rounded-lg p-2">
            <div className="font-semibold text-[9px]">{s}</div>
            <div className="text-[7px] text-muted-foreground">Leading solutions</div>
          </div>
        ))}
      </div>
      <div className="bg-[hsl(220,25%,12%)] text-primary-foreground/60 px-4 py-2 text-[7px]">© Enterprise+ 2024</div>
    </div>
  );
}

function PortfolioPreview1() {
  return (
    <div className="bg-[hsl(0,0%,5%)] w-full h-full font-sans text-[10px] text-primary-foreground">
      <div className="px-4 py-2 flex items-center justify-between border-b border-primary-foreground/10">
        <span className="font-bold text-sm">STUDIO</span>
        <div className="flex gap-3 text-[8px] opacity-60"><span>Work</span><span>About</span><span>Contact</span></div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold leading-tight">Creative<br/>Designer</div>
        <div className="text-[8px] opacity-50 mt-1">Award-winning portfolio</div>
      </div>
      <div className="grid grid-cols-2 gap-1 px-4">
        <div className="aspect-square bg-gradient-to-br from-[hsl(330,65%,50%)] to-[hsl(280,60%,40%)] rounded-lg" />
        <div className="aspect-square bg-gradient-to-br from-[hsl(200,60%,50%)] to-[hsl(220,60%,40%)] rounded-lg" />
      </div>
      <div className="px-4 py-3 text-[7px] opacity-40">© Studio 2024</div>
    </div>
  );
}

function PortfolioPreview2() {
  return (
    <div className="bg-[hsl(40,20%,96%)] w-full h-full font-sans text-[10px]">
      <div className="px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm font-serif">Jane Doe</span>
        <div className="flex gap-3 text-[8px] text-muted-foreground"><span>Projects</span><span>About</span></div>
      </div>
      <div className="px-4 py-6">
        <div className="text-3xl font-bold font-serif leading-none">Design<br/>&amp; Art</div>
        <div className="text-[8px] text-muted-foreground mt-2">Minimal personal brand</div>
      </div>
      <div className="px-4 space-y-2">
        <div className="h-12 bg-[hsl(330,30%,85%)] rounded-xl" />
        <div className="h-12 bg-[hsl(200,30%,85%)] rounded-xl" />
      </div>
      <div className="px-4 py-3 text-[7px] text-muted-foreground">© Jane Doe 2024</div>
    </div>
  );
}

function EducationPreview1() {
  return (
    <div className="bg-[hsl(170,20%,97%)] w-full h-full font-sans text-[10px]">
      <div className="bg-[hsl(170,55%,25%)] text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">Academy</span>
        <div className="flex gap-3 text-[8px]"><span>Courses</span><span>About</span><span>Enroll</span></div>
      </div>
      <div className="bg-[hsl(170,40%,92%)] px-4 py-6 text-center">
        <div className="text-lg font-bold text-[hsl(170,55%,20%)]">Learn Without Limits</div>
        <div className="text-[8px] text-muted-foreground mt-1">Quality education for everyone</div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {['Math', 'Science', 'Arts'].map(c => (
          <div key={c} className="bg-card rounded-lg p-2 text-center border border-border">
            <div className="w-5 h-5 rounded-full bg-[hsl(170,55%,42%)]/20 mx-auto mb-1" />
            <div className="font-semibold text-[8px]">{c}</div>
          </div>
        ))}
      </div>
      <div className="bg-[hsl(170,55%,20%)] text-primary-foreground/60 px-4 py-2 text-[7px]">© Academy 2024</div>
    </div>
  );
}

function EducationPreview2() {
  return (
    <div className="bg-card w-full h-full font-sans text-[10px]">
      <div className="bg-[hsl(200,50%,45%)] text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">LearnHub</span>
        <div className="flex gap-3 text-[8px]"><span>Browse</span><span>Pricing</span></div>
      </div>
      <div className="p-4">
        <div className="text-lg font-bold">Start Your Journey</div>
        <div className="text-[8px] text-muted-foreground">1000+ courses available</div>
      </div>
      <div className="space-y-2 px-4">
        {['Web Development', 'Data Science', 'Design'].map(c => (
          <div key={c} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
            <div className="w-8 h-6 rounded bg-[hsl(200,50%,45%)]/20 shrink-0" />
            <div>
              <div className="font-semibold text-[8px]">{c}</div>
              <div className="text-[6px] text-muted-foreground">12 lessons</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[hsl(200,50%,20%)] text-primary-foreground/60 px-4 py-2 mt-2 text-[7px]">© LearnHub</div>
    </div>
  );
}

function EventPreview1() {
  return (
    <div className="bg-[hsl(280,30%,8%)] w-full h-full font-sans text-[10px] text-primary-foreground">
      <div className="px-4 py-2 flex items-center justify-between border-b border-primary-foreground/10">
        <span className="font-bold text-sm">FEST24</span>
        <div className="flex gap-3 text-[8px] opacity-60"><span>Lineup</span><span>Tickets</span></div>
      </div>
      <div className="bg-gradient-to-br from-[hsl(280,65%,55%)] to-[hsl(320,65%,45%)] px-4 py-8 text-center">
        <div className="text-2xl font-bold">FESTIVAL</div>
        <div className="text-[9px] opacity-80">June 15–17, 2024</div>
        <div className="mt-3 inline-block bg-primary-foreground text-[hsl(280,65%,35%)] px-3 py-1 rounded-full text-[8px] font-bold">Get Tickets</div>
      </div>
      <div className="grid grid-cols-3 gap-1 p-3">
        {[1,2,3].map(i => (
          <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-[hsl(280,40%,25%)] to-[hsl(320,40%,20%)]" />
        ))}
      </div>
      <div className="px-4 py-2 text-[7px] opacity-30">© FEST24</div>
    </div>
  );
}

function EventPreview2() {
  return (
    <div className="bg-card w-full h-full font-sans text-[10px]">
      <div className="bg-gradient-to-r from-[hsl(260,60%,50%)] to-[hsl(300,60%,50%)] text-primary-foreground px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-sm">CONF</span>
        <div className="flex gap-3 text-[8px]"><span>Speakers</span><span>Schedule</span><span>Register</span></div>
      </div>
      <div className="px-4 py-6">
        <div className="text-lg font-bold">Tech Conference 2024</div>
        <div className="text-[8px] text-muted-foreground">The future starts here</div>
      </div>
      <div className="px-4 space-y-2">
        {['Alex Chen', 'Maria Santos'].map(s => (
          <div key={s} className="flex items-center gap-2 bg-[hsl(260,60%,96%)] rounded-lg p-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(260,60%,50%)] to-[hsl(300,60%,50%)]" />
            <div>
              <div className="font-semibold text-[8px]">{s}</div>
              <div className="text-[6px] text-muted-foreground">Keynote Speaker</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[hsl(260,30%,15%)] text-primary-foreground/60 px-4 py-2 mt-2 text-[7px]">© CONF 2024</div>
    </div>
  );
}

function BlogPreview1() {
  return (
    <div className="bg-[hsl(40,30%,97%)] w-full h-full font-sans text-[10px]">
      <div className="px-4 py-2 flex items-center justify-between border-b border-border">
        <span className="font-bold text-sm font-serif">The Edit</span>
        <div className="flex gap-3 text-[8px] text-muted-foreground"><span>Stories</span><span>About</span></div>
      </div>
      <div className="px-4 py-6">
        <div className="text-[8px] text-[hsl(35,85%,52%)] font-semibold mb-1">FEATURED</div>
        <div className="text-lg font-bold font-serif leading-tight">The Art of Modern Writing</div>
        <div className="text-[8px] text-muted-foreground mt-1">A deep dive into contemporary storytelling</div>
      </div>
      <div className="px-4 space-y-2">
        {['Design Thinking', 'Travel Notes'].map(a => (
          <div key={a} className="flex gap-2 items-center border-b border-border pb-2">
            <div className="w-10 h-8 rounded bg-[hsl(35,30%,88%)] shrink-0" />
            <div>
              <div className="font-semibold text-[8px]">{a}</div>
              <div className="text-[6px] text-muted-foreground">5 min read</div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 text-[7px] text-muted-foreground">© The Edit 2024</div>
    </div>
  );
}

function BlogPreview2() {
  return (
    <div className="bg-card w-full h-full font-sans text-[10px]">
      <div className="px-4 py-2 flex items-center justify-between border-b border-border">
        <span className="font-bold text-sm">Inkwell</span>
        <div className="flex gap-3 text-[8px] text-muted-foreground"><span>Latest</span><span>Topics</span><span>Authors</span></div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2">
        {['Tech Trends', 'Life Hacks', 'Productivity', 'Health'].map(a => (
          <div key={a} className="bg-muted/50 rounded-xl p-3">
            <div className="w-full h-8 rounded bg-[hsl(35,30%,85%)] mb-2" />
            <div className="font-semibold text-[8px]">{a}</div>
            <div className="text-[6px] text-muted-foreground">3 min read</div>
          </div>
        ))}
      </div>
      <div className="bg-muted px-4 py-2 text-[7px] text-muted-foreground">© Inkwell 2024</div>
    </div>
  );
}

function BusinessPreview3() {
  return (
    <div className="bg-[#0f172a] w-full h-full font-sans text-[10px] text-white">
      <div className="bg-[#1e293b] px-4 py-2 flex items-center justify-between border-b border-[#334155]">
        <span className="font-bold text-sm text-[#38bdf8]">Vortex</span>
        <div className="flex gap-3 text-[8px] opacity-70"><span>Product</span><span>Team</span><span>Contact</span></div>
      </div>
      <div className="px-4 py-8 text-center bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">Next Gen SAAS</div>
        <div className="text-[8px] text-slate-400 mt-1">Accelerate your workflow</div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {['Analytics', 'Integration'].map(s => (
          <div key={s} className="bg-[#1e293b] rounded-lg p-2 border border-[#334155]">
            <div className="w-4 h-4 rounded bg-[#38bdf8]/20 mb-1" />
            <div className="font-semibold text-[8px]">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessPreview4() {
  return (
    <div className="bg-[#fffbeb] w-full h-full font-sans text-[10px] text-[#451a03]">
      <div className="px-4 py-2 flex items-center justify-between border-b border-[#fde68a]">
        <span className="font-bold text-sm">Corner Shop</span>
      </div>
      <div className="p-4">
        <div className="w-full h-16 bg-[#fcd34d] rounded-lg flex items-center justify-center font-bold text-[#b45309]">Store Map</div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4">
        {[1,2,3].map(i => (
          <div key={i} className="aspect-square bg-[#fef3c7] rounded-md border border-[#fde68a]" />
        ))}
      </div>
      <div className="p-4 text-[7px] text-[#78350f]">📍 123 Main Street</div>
    </div>
  );
}

function BusinessPreview5() {
  return (
    <div className="bg-white w-full h-full font-serif text-[10px] text-black border-x border-[#f3f4f6]">
      <div className="px-4 py-3 flex items-center justify-between uppercase tracking-widest text-[7px]">
        <span className="font-bold text-xs">Vanguard</span>
        <div className="flex gap-3 text-[6px]"><span>About</span><span>Services</span></div>
      </div>
      <div className="px-6 py-6 text-center">
        <div className="text-2xl font-light">Elevating Brands</div>
        <div className="text-[7px] text-gray-500 mt-2 font-sans">Premium consulting services</div>
        <div className="mt-4 border-b border-black pb-1 inline-block text-[6px] uppercase">Discover</div>
      </div>
    </div>
  );
}

function PortfolioPreview3() {
  return (
    <div className="bg-[#0d1117] w-full h-full font-mono text-[9px] text-[#c9d1d9]">
      <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-[#30363d]">
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-yellow-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div>
        <span className="text-[8px] text-[#8b949e]">~ / portfolio / dev</span>
      </div>
      <div className="p-4">
        <div className="text-[#58a6ff]">const <span className="text-[#d2a8ff]">developer</span> = {'{'}</div>
        <div className="pl-4">
          <div>name: <span className="text-[#a5d6ff]">'Alex'</span>,</div>
          <div>role: <span className="text-[#a5d6ff]">'Full Stack'</span>,</div>
          <div>skills: [<span className="text-[#a5d6ff]">'React'</span>, <span className="text-[#a5d6ff]">'Node'</span>]</div>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  );
}

function PortfolioPreview4() {
  return (
    <div className="bg-white w-full h-full font-sans text-[10px]">
      <div className="flex h-full">
        <div className="w-12 h-full bg-[#f8f9fa] border-r border-gray-200 flex flex-col items-center py-4 gap-4 text-[7px] uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span>Gallery</span><span className="font-bold">Photo</span>
        </div>
        <div className="flex-1 p-2 grid grid-cols-2 gap-1 overflow-hidden h-full">
          <div className="bg-gray-200 h-24 rounded" />
          <div className="bg-gray-300 h-16 rounded" />
          <div className="bg-gray-400 h-20 rounded -mt-8" />
          <div className="bg-gray-200 h-24 rounded" />
        </div>
      </div>
    </div>
  );
}

function PortfolioPreview5() {
  return (
    <div className="bg-[#000] w-full h-full font-sans text-[10px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3b0764,transparent_50%)] opactiy-50" />
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center opacity-80 text-[8px]">
          <span className="font-bold tracking-widest">NX</span>
          <span>WORKS</span>
        </div>
        <div className="mt-8 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">3D<br/>Vis.</div>
      </div>
    </div>
  );
}

function EducationPreview3() {
  return (
    <div className="bg-[#f0f9ff] w-full h-full font-sans text-[10px]">
      <div className="bg-[#0ea5e9] text-white px-4 py-3 flex items-center justify-center rounded-b-2xl">
        <span className="font-bold text-sm bg-white text-[#0ea5e9] px-2 py-0.5 rounded-full">KIDS PLAY</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-[#fbbf24] h-12 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-lg">A</div>
        <div className="bg-[#ef4444] h-12 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-lg">1</div>
        <div className="bg-[#10b981] h-12 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-lg col-span-2">Shapes</div>
      </div>
    </div>
  );
}

function EducationPreview4() {
  return (
    <div className="bg-[#f8f7f5] w-full h-full font-serif text-[10px] text-[#1e3a8a]">
      <div className="border-b-4 border-[#1e3a8a] bg-white px-4 py-2 flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-xs uppercase tracking-widest">University</div>
          <div className="text-[6px] text-gray-500 font-sans">EST. 1882</div>
        </div>
      </div>
      <div className="p-4 columns-2 gap-4">
        <div className="bg-[#1e3a8a] text-white p-2 mb-4 break-inside-avoid">
          <div className="font-bold text-[8px]">Admissions</div>
          <div className="text-[6px] opacity-80 mt-1">Apply for Fall</div>
        </div>
        <div className="bg-white border border-[#e5e7eb] p-2 break-inside-avoid">
          <div className="font-bold text-[8px]">Campus Life</div>
          <div className="text-[6px] text-gray-500 mt-1">Housing & Dining</div>
        </div>
      </div>
    </div>
  );
}

function EducationPreview5() {
  return (
    <div className="bg-[#0a0a0a] w-full h-full font-sans text-[10px] text-white">
      <div className="p-4 flex items-center justify-between border-b border-[#262626]">
        <span className="font-black text-[#a3e635] tracking-tighter">BOOTCAMP</span>
        <div className="bg-[#a3e635] text-black px-2 py-0.5 text-[6px] font-bold uppercase transition hover:scale-105">Join Now</div>
      </div>
      <div className="px-4 py-6">
        <div className="text-2xl font-black leading-none uppercase tracking-tighter">Code<br/>Faster.</div>
        <div className="text-[7px] text-gray-400 mt-2 max-w-[80%]">12 weeks to master full-stack development</div>
      </div>
      <div className="px-4 flex gap-1">
        {['HTML', 'CSS', 'JS'].map(s => (
          <div key={s} className="border border-[#3f6212] text-[#a3e635] px-1.5 py-0.5 text-[6px] uppercase font-bold">{s}</div>
        ))}
      </div>
    </div>
  );
}

function EventPreview3() {
  return (
    <div className="bg-[#fdfbf7] w-full h-full font-serif text-[10px] text-[#4a4a4a]">
      <div className="p-6 text-center border-b border-[#f3e8e0]">
        <div className="text-xl italic text-[#c3a995]">E & J</div>
        <div className="text-[6px] uppercase tracking-[0.3em] text-[#8c8c8c] mt-2">Save the Date</div>
      </div>
      <div className="p-4 text-center">
        <div className="aspect-video bg-[#f3e8e0] rounded-t-full mx-8 mb-3" />
        <div className="text-[8px] uppercase tracking-widest">October 12, 2025</div>
      </div>
    </div>
  );
}

function EventPreview4() {
  return (
    <div className="bg-[#f0fdf4] w-full h-full font-sans text-[10px] text-[#14532d]">
      <div className="bg-[#16a34a] px-4 py-2 flex items-center justify-between text-white">
        <span className="font-bold text-sm">Design Meetup</span>
        <div className="bg-white text-[#16a34a] text-[6px] font-bold px-1.5 py-0.5 rounded-full">RSVP</div>
      </div>
      <div className="p-4">
        <div className="font-bold text-lg mb-1">Local Creatives</div>
        <div className="text-[7px] opacity-80 mb-4">Thursday, 7 PM @ Downtown Cafe</div>
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-[#86efac] border-2 border-[#f0fdf4]" />
          ))}
          <div className="w-6 h-6 rounded-full bg-[#16a34a] border-2 border-[#f0fdf4] flex items-center justify-center text-white text-[6px] font-bold">+12</div>
        </div>
      </div>
    </div>
  );
}

function EventPreview5() {
  return (
    <div className="bg-white w-full h-full font-sans text-[10px] text-black">
      <div className="flex h-full">
        <div className="w-2/3 bg-gray-900 border-r border-gray-800 p-2 flex flex-col justify-between text-white">
          <div className="text-[7px] text-gray-400">🔴 LIVE WEBINAR</div>
          <div className="bg-gray-800 aspect-video rounded flex items-center justify-center mt-2 border border-gray-700">▶</div>
        </div>
        <div className="w-1/3 bg-gray-50 p-2 border-l border-gray-200 flex flex-col gap-2">
           <div className="font-bold text-[8px] border-b border-gray-200 pb-1">Register</div>
           <div className="bg-white border border-gray-200 h-4 rounded" />
           <div className="bg-white border border-gray-200 h-4 rounded" />
           <div className="bg-blue-600 h-4 rounded mt-auto text-white text-[6px] flex items-center justify-center font-bold">Submit</div>
        </div>
      </div>
    </div>
  );
}

function BlogPreview3() {
  return (
    <div className="bg-[#fdf8f5] w-full h-full font-serif text-[10px] text-[#5c4a43]">
      <div className="p-4 text-center">
        <div className="w-10 h-10 rounded-full bg-[#e8dbce] mx-auto mb-2" />
        <div className="font-bold text-sm italic">My Thoughts</div>
      </div>
      <div className="px-6 space-y-4">
        <div className="border-l-2 border-[#d4bdac] pl-3">
          <div className="text-[6px] text-[#998675] uppercase tracking-wider mb-1">Jan 14</div>
          <div className="font-bold text-[9px] leading-tight">A quiet morning coffee</div>
        </div>
         <div className="border-l-2 border-[#fdf8f5] pl-3">
          <div className="text-[6px] text-[#998675] uppercase tracking-wider mb-1">Jan 10</div>
          <div className="font-bold text-[9px] leading-tight opacity-70">Rainy day reflections</div>
        </div>
      </div>
    </div>
  );
}

function BlogPreview4() {
  return (
    <div className="bg-white w-full h-full font-sans text-[10px] text-black">
      <div className="bg-black text-white px-2 py-1 text-[6px] font-bold uppercase tracking-wider flex justify-between">
        <span>Breaking</span><span>Markets</span><span>Tech</span>
      </div>
      <div className="border-b-4 border-black px-4 py-2">
        <div className="font-black text-2xl tracking-tighter">THE POST</div>
      </div>
      <div className="p-2 grid grid-cols-4 gap-2 border-t border-gray-200 pt-2">
        <div className="col-span-3 border-r border-gray-200 pr-2">
          <div className="bg-gray-200 h-16 w-full mb-2" />
          <div className="font-bold text-[10px] leading-tight">Global Markets Rally</div>
        </div>
        <div className="col-span-1 space-y-2">
          <div className="font-bold text-[7px] border-b border-gray-200 pb-1">Trending</div>
          <div className="bg-gray-100 h-6 w-full" />
          <div className="bg-gray-100 h-6 w-full" />
        </div>
      </div>
    </div>
  );
}

function BlogPreview5() {
  return (
    <div className="bg-[#111] w-full h-full font-sans text-[10px] text-white relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10" />
      <div className="absolute inset-0 bg-[#333] z-0 image-placeholder" />
      <div className="relative z-20 h-full flex flex-col justify-between p-4">
        <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-bold">
          <span>Wanderlust</span>
          <span className="bg-white text-black px-1.5 py-0.5 rounded">Subscribe</span>
        </div>
        <div>
          <div className="text-[7px] mb-1 font-bold tracking-widest text-gray-300">TRAVEL</div>
          <div className="text-2xl font-bold leading-none">Exploring the<br/>Highlands</div>
        </div>
      </div>
    </div>
  );
}

export default WizardTemplate;

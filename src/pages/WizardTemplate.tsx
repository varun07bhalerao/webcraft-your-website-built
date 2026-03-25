import { useNavigate, useParams } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { Globe, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const templateData: Record<WebsiteType, { name: string; desc: string; preview: React.ReactNode }[]> = {
  business: [
    { name: 'Corporate Pro', desc: 'Clean grid layout with structured sections', preview: <BusinessPreview1 /> },
    { name: 'Enterprise', desc: 'Bold hero with service cards', preview: <BusinessPreview2 /> },
  ],
  portfolio: [
    { name: 'Creative Studio', desc: 'Large images with asymmetric grid', preview: <PortfolioPreview1 /> },
    { name: 'Minimal Folio', desc: 'Typography-focused personal brand', preview: <PortfolioPreview2 /> },
  ],
  education: [
    { name: 'Academy', desc: 'Structured content with soft colors', preview: <EducationPreview1 /> },
    { name: 'LearnHub', desc: 'Card-based course layout', preview: <EducationPreview2 /> },
  ],
  event: [
    { name: 'Festival', desc: 'Vibrant gradients with bold hero', preview: <EventPreview1 /> },
    { name: 'Conference', desc: 'Dynamic speaker & schedule layout', preview: <EventPreview2 /> },
  ],
  blog: [
    { name: 'Editorial', desc: 'Content-first minimal design', preview: <BlogPreview1 /> },
    { name: 'Magazine', desc: 'Rich article cards layout', preview: <BlogPreview2 /> },
  ],
};

const WizardTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, updateProject } = useProjects();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const type = currentProject?.type || 'business';
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

export default WizardTemplate;

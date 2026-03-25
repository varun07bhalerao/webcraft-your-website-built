import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { Eye, Globe, ArrowLeft, Rocket, Home, User, Briefcase, Image, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const sectionIcons: Record<string, any> = { home: Home, about: User, services: Briefcase, gallery: Image, contact: Phone };
const sections = ['home', 'about', 'services', 'gallery', 'contact'] as const;

const editorAccents: Record<WebsiteType, string> = {
  business: 'border-business/20',
  portfolio: 'border-portfolio/20',
  education: 'border-education/20',
  event: 'border-event/20',
  blog: 'border-blog/20',
};

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, updateProject } = useProjects();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<typeof sections[number]>('home');
  const [content, setContent] = useState<Record<string, any>>(currentProject?.content || {
    home: { headline: 'Welcome to Our Website', subtext: 'Build something amazing', cta: 'Get Started' },
    about: { title: 'About Us', text: 'We are passionate about delivering excellence.' },
    services: { title: 'Our Services', items: ['Service 1', 'Service 2', 'Service 3'] },
    gallery: { title: 'Gallery', images: [] },
    contact: { title: 'Contact Us', email: currentProject?.email || '', phone: currentProject?.phone || '' },
  });

  const type = currentProject?.type || 'business';

  const updateField = (section: string, field: string, value: any) => {
    const updated = { ...content, [section]: { ...content[section], [field]: value } };
    setContent(updated);
    if (id) updateProject(id, { content: updated });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card h-14 flex items-center px-4 gap-3 shrink-0">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <span className="font-display font-bold">{currentProject?.name || 'Untitled'}</span>
          <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-0.5 rounded-full">{type}</span>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/preview/${id}`)}>
            <Eye className="w-4 h-4 mr-1" /> Preview
          </Button>
          <Button size="sm" className="gradient-bg text-primary-foreground" onClick={() => navigate(`/deploy/${id}`)}>
            <Rocket className="w-4 h-4 mr-1" /> Deploy
          </Button>
        </div>
      </header>

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className={`w-96 border-r ${editorAccents[type]} bg-card overflow-y-auto`}>
          <div className="flex border-b border-border">
            {sections.map(s => {
              const Icon = sectionIcons[s];
              return (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`flex-1 py-3 text-xs font-medium capitalize transition-colors flex flex-col items-center gap-1 ${
                    activeSection === s ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s}
                </button>
              );
            })}
          </div>
          <div className="p-5 space-y-4">
            {activeSection === 'home' && (
              <>
                <Field label="Headline" value={content.home?.headline} onChange={v => updateField('home', 'headline', v)} />
                <Field label="Subtext" value={content.home?.subtext} onChange={v => updateField('home', 'subtext', v)} textarea />
                <Field label="CTA Button" value={content.home?.cta} onChange={v => updateField('home', 'cta', v)} />
              </>
            )}
            {activeSection === 'about' && (
              <>
                <Field label="Title" value={content.about?.title} onChange={v => updateField('about', 'title', v)} />
                <Field label="Description" value={content.about?.text} onChange={v => updateField('about', 'text', v)} textarea />
              </>
            )}
            {activeSection === 'services' && (
              <>
                <Field label="Section Title" value={content.services?.title} onChange={v => updateField('services', 'title', v)} />
                {(content.services?.items || []).map((item: string, i: number) => (
                  <Field key={i} label={`Service ${i + 1}`} value={item} onChange={v => {
                    const items = [...(content.services?.items || [])];
                    items[i] = v;
                    updateField('services', 'items', items);
                  }} />
                ))}
                <Button variant="outline" size="sm" onClick={() => updateField('services', 'items', [...(content.services?.items || []), `Service ${(content.services?.items?.length || 0) + 1}`])}>
                  + Add Service
                </Button>
              </>
            )}
            {activeSection === 'gallery' && (
              <p className="text-sm text-muted-foreground">Gallery image upload coming soon.</p>
            )}
            {activeSection === 'contact' && (
              <>
                <Field label="Title" value={content.contact?.title} onChange={v => updateField('contact', 'title', v)} />
                <Field label="Email" value={content.contact?.email} onChange={v => updateField('contact', 'email', v)} />
                <Field label="Phone" value={content.contact?.phone} onChange={v => updateField('contact', 'phone', v)} />
              </>
            )}
          </div>
        </div>

        {/* Right panel - live preview */}
        <div className="flex-1 bg-muted/30 overflow-y-auto">
          <LivePreview type={type} content={content} name={currentProject?.name || 'My Website'} />
        </div>
      </div>
    </div>
  );
};

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block">{label}</label>
      {textarea ? (
        <Textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3} />
      ) : (
        <Input value={value || ''} onChange={e => onChange(e.target.value)} className="h-10" />
      )}
    </div>
  );
}

export function LivePreview({ type, content, name }: { type: WebsiteType; content: Record<string, any>; name: string }) {
  const renderers: Record<WebsiteType, () => JSX.Element> = {
    business: () => (
      <div className="font-sans">
        <nav className="bg-[hsl(215,70%,50%)] text-white px-8 py-4 flex items-center justify-between">
          <span className="font-bold text-xl">{name}</span>
          <div className="flex gap-6 text-sm">
            <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
          </div>
        </nav>
        <div className="bg-gradient-to-br from-[hsl(215,70%,95%)] to-[hsl(215,50%,98%)] px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-[hsl(215,70%,25%)]">{content.home?.headline}</h1>
          <p className="text-[hsl(215,30%,45%)] mt-3 text-lg max-w-xl mx-auto">{content.home?.subtext}</p>
          <button className="mt-6 bg-[hsl(215,70%,50%)] text-white px-8 py-3 rounded-lg font-semibold">{content.home?.cta}</button>
        </div>
        <div className="px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-4">{content.about?.title}</h2>
          <p className="text-center text-[hsl(215,15%,50%)] max-w-2xl mx-auto">{content.about?.text}</p>
        </div>
        <div className="bg-[hsl(215,30%,97%)] px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">{content.services?.title}</h2>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {(content.services?.items || []).map((s: string, i: number) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-[hsl(215,30%,92%)]">
                <div className="w-10 h-10 rounded-lg bg-[hsl(215,70%,50%)]/10 mx-auto mb-3" />
                <h3 className="font-semibold">{s}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[hsl(215,70%,15%)] text-white px-8 py-8 text-center">
          <h2 className="text-xl font-bold mb-2">{content.contact?.title}</h2>
          <p className="text-white/60 text-sm">{content.contact?.email} • {content.contact?.phone}</p>
          <p className="text-white/40 text-xs mt-4">© {name} {new Date().getFullYear()}</p>
        </div>
      </div>
    ),
    portfolio: () => (
      <div className="font-sans bg-[hsl(0,0%,5%)] text-white min-h-full">
        <nav className="px-8 py-4 flex items-center justify-between border-b border-white/10">
          <span className="font-bold text-xl">{name}</span>
          <div className="flex gap-6 text-sm text-white/60"><span>Work</span><span>About</span><span>Contact</span></div>
        </nav>
        <div className="px-8 py-20">
          <h1 className="text-5xl font-bold leading-tight">{content.home?.headline}</h1>
          <p className="text-white/50 mt-4 text-lg max-w-lg">{content.home?.subtext}</p>
          <button className="mt-6 bg-[hsl(330,65%,50%)] text-white px-8 py-3 rounded-full font-semibold">{content.home?.cta}</button>
        </div>
        <div className="px-8 py-16">
          <h2 className="text-2xl font-bold mb-4">{content.about?.title}</h2>
          <p className="text-white/60 max-w-xl">{content.about?.text}</p>
        </div>
        <div className="px-8 py-16">
          <h2 className="text-2xl font-bold mb-6">{content.services?.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {(content.services?.items || []).map((s: string, i: number) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg">{s}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="px-8 py-10 border-t border-white/10">
          <p className="text-white/40 text-sm">{content.contact?.email} • {content.contact?.phone}</p>
          <p className="text-white/20 text-xs mt-2">© {name} {new Date().getFullYear()}</p>
        </div>
      </div>
    ),
    education: () => (
      <div className="font-sans">
        <nav className="bg-[hsl(170,55%,30%)] text-white px-8 py-4 flex items-center justify-between">
          <span className="font-bold text-xl">{name}</span>
          <div className="flex gap-6 text-sm"><span>Courses</span><span>About</span><span>Enroll</span><span>Contact</span></div>
        </nav>
        <div className="bg-[hsl(170,30%,95%)] px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-[hsl(170,55%,18%)]">{content.home?.headline}</h1>
          <p className="text-[hsl(170,20%,40%)] mt-3 text-lg max-w-xl mx-auto">{content.home?.subtext}</p>
          <button className="mt-6 bg-[hsl(170,55%,42%)] text-white px-8 py-3 rounded-lg font-semibold">{content.home?.cta}</button>
        </div>
        <div className="px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{content.about?.title}</h2>
          <p className="text-[hsl(170,15%,45%)] max-w-2xl mx-auto">{content.about?.text}</p>
        </div>
        <div className="bg-[hsl(170,20%,97%)] px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">{content.services?.title}</h2>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {(content.services?.items || []).map((s: string, i: number) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-[hsl(170,20%,90%)]">
                <h3 className="font-semibold">{s}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[hsl(170,55%,18%)] text-white px-8 py-8 text-center">
          <h2 className="text-xl font-bold mb-2">{content.contact?.title}</h2>
          <p className="text-white/60 text-sm">{content.contact?.email}</p>
          <p className="text-white/30 text-xs mt-4">© {name} {new Date().getFullYear()}</p>
        </div>
      </div>
    ),
    event: () => (
      <div className="font-sans">
        <nav className="bg-gradient-to-r from-[hsl(280,65%,55%)] to-[hsl(320,65%,50%)] text-white px-8 py-4 flex items-center justify-between">
          <span className="font-bold text-xl">{name}</span>
          <div className="flex gap-6 text-sm"><span>Lineup</span><span>Schedule</span><span>Tickets</span></div>
        </nav>
        <div className="bg-gradient-to-br from-[hsl(280,65%,55%)] via-[hsl(300,60%,50%)] to-[hsl(320,65%,50%)] text-white px-8 py-24 text-center">
          <h1 className="text-5xl font-bold">{content.home?.headline}</h1>
          <p className="text-white/70 mt-3 text-lg max-w-xl mx-auto">{content.home?.subtext}</p>
          <button className="mt-6 bg-white text-[hsl(280,65%,45%)] px-8 py-3 rounded-full font-bold">{content.home?.cta}</button>
        </div>
        <div className="px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{content.about?.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content.about?.text}</p>
        </div>
        <div className="bg-[hsl(280,20%,97%)] px-8 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">{content.services?.title}</h2>
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {(content.services?.items || []).map((s: string, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow border border-[hsl(280,20%,90%)]">
                <h3 className="font-semibold">{s}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[hsl(280,30%,12%)] text-white px-8 py-8 text-center">
          <p className="text-white/60 text-sm">{content.contact?.email} • {content.contact?.phone}</p>
          <p className="text-white/30 text-xs mt-4">© {name} {new Date().getFullYear()}</p>
        </div>
      </div>
    ),
    blog: () => (
      <div className="font-sans bg-[hsl(40,30%,98%)]">
        <nav className="px-8 py-4 flex items-center justify-between border-b border-[hsl(35,20%,90%)]">
          <span className="font-bold text-xl font-serif">{name}</span>
          <div className="flex gap-6 text-sm text-muted-foreground"><span>Stories</span><span>About</span><span>Contact</span></div>
        </nav>
        <div className="px-8 py-20 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold font-serif leading-tight">{content.home?.headline}</h1>
          <p className="text-muted-foreground mt-3 text-lg">{content.home?.subtext}</p>
        </div>
        <div className="max-w-2xl mx-auto px-8 py-12 border-t border-[hsl(35,20%,90%)]">
          <h2 className="text-2xl font-bold font-serif mb-4">{content.about?.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{content.about?.text}</p>
        </div>
        <div className="max-w-2xl mx-auto px-8 py-12 border-t border-[hsl(35,20%,90%)]">
          <h2 className="text-2xl font-bold font-serif mb-6">{content.services?.title}</h2>
          <div className="space-y-4">
            {(content.services?.items || []).map((s: string, i: number) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[hsl(35,20%,90%)]">
                <h3 className="font-semibold">{s}</h3>
                <p className="text-sm text-muted-foreground mt-1">Read more →</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[hsl(35,20%,12%)] text-white px-8 py-8 text-center">
          <p className="text-white/60 text-sm">{content.contact?.email}</p>
          <p className="text-white/30 text-xs mt-4">© {name} {new Date().getFullYear()}</p>
        </div>
      </div>
    ),
  };

  return renderers[type]();
}

export default Editor;

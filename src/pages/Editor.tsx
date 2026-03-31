import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { Eye, Globe, ArrowLeft, Rocket, Home, User, Briefcase, Image, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WebsiteTemplate } from '@/templates/TemplateSystem';

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
        <div className="flex-1 bg-muted/30 overflow-y-auto w-full">
          <WebsiteTemplate 
            type={type} 
            templateIndex={currentProject?.template || 0}
            content={content} 
            name={currentProject?.name || 'My Website'} 
          />
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



export default Editor;

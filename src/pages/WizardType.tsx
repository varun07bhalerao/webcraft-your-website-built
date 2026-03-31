import { useNavigate, useParams } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { Briefcase, Palette, GraduationCap, PartyPopper, PenLine, Globe } from 'lucide-react';
import { useEffect } from 'react';

const types: { key: WebsiteType; label: string; desc: string; icon: any; color: string; gradient: string }[] = [
  { key: 'business', label: 'Business', desc: 'Corporate & professional websites', icon: Briefcase, color: 'border-business/30 hover:border-business', gradient: 'from-business/10 to-business/5' },
  { key: 'portfolio', label: 'Portfolio', desc: 'Showcase your creative work', icon: Palette, color: 'border-portfolio/30 hover:border-portfolio', gradient: 'from-portfolio/10 to-portfolio/5' },
  { key: 'education', label: 'Education', desc: 'Academic & learning platforms', icon: GraduationCap, color: 'border-education/30 hover:border-education', gradient: 'from-education/10 to-education/5' },
  { key: 'event', label: 'Event', desc: 'Vibrant event & conference sites', icon: PartyPopper, color: 'border-event/30 hover:border-event', gradient: 'from-event/10 to-event/5' },
  { key: 'blog', label: 'Blog', desc: 'Content-focused publishing', icon: PenLine, color: 'border-blog/30 hover:border-blog', gradient: 'from-blog/10 to-blog/5' },
];

const iconColors: Record<string, string> = {
  business: 'text-business',
  portfolio: 'text-portfolio',
  education: 'text-education',
  event: 'text-event',
  blog: 'text-blog',
};

const WizardType = () => {
  const { id } = useParams<{ id: string }>();
  const { updateProject, currentProject, projects, setCurrentProject } = useProjects();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && (!currentProject || currentProject.id !== id)) {
      const p = projects.find(proj => proj.id === id);
      if (p) setCurrentProject(p);
    }
  }, [id, currentProject, projects, setCurrentProject]);

  const select = (type: WebsiteType) => {
    if (!id) return;
    updateProject(id, { type });
    navigate(`/wizard/${id}/template`);
  };

  const isSelected = (type: WebsiteType) => {
    const activeType = currentProject?.id === id ? currentProject.type : projects.find(p => p.id === id)?.type;
    return activeType === type;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg">WebCraft</span>
          <span className="ml-auto text-sm text-muted-foreground">Step 2 of 3</span>
        </div>

        <h1 className="text-3xl font-display font-bold mb-2">Choose Website Type</h1>
        <p className="text-muted-foreground mb-10">Select the category that best fits your project</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t, i) => (
            <button
              key={t.key}
              onClick={() => select(t.key)}
              className={`group text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in ${
                isSelected(t.key) 
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                  : `${t.color} bg-gradient-to-br ${t.gradient}`
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 shadow-sm group-hover:animate-float ${
                isSelected(t.key) ? 'bg-primary/10' : ''
              }`}>
                <t.icon className={`w-6 h-6 ${isSelected(t.key) ? 'text-primary' : iconColors[t.key]}`} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{t.label}</h3>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardType;

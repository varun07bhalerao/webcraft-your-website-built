import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import { Rocket, ExternalLink, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const hosts = [
  { name: 'Firebase Hosting', desc: 'Google-backed free hosting', color: 'from-amber-400 to-orange-500' },
  { name: 'Netlify', desc: 'Automatic deployments with CDN', color: 'from-teal-400 to-emerald-500' },
  { name: 'Vercel', desc: 'Edge network deployment', color: 'from-gray-700 to-gray-900' },
];

const Deploy = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl gradient-bg mx-auto flex items-center justify-center mb-6 animate-float">
          <Rocket className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle2 className="w-6 h-6 text-success" />
          <h1 className="text-3xl font-display font-bold">Your website is ready!</h1>
        </div>
        <p className="text-muted-foreground mb-10">
          <span className="font-medium text-foreground">{currentProject?.name || 'Your Website'}</span> is ready to go live. Choose a hosting platform:
        </p>

        <div className="space-y-3 mb-8">
          {hosts.map((h, i) => (
            <button
              key={h.name}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all text-left animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${h.color} flex items-center justify-center shrink-0`}>
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{h.name}</div>
                <div className="text-sm text-muted-foreground">{h.desc}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(`/editor/${id}`)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Editor
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deploy;

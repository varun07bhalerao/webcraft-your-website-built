import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import { Monitor, Tablet, Smartphone, ArrowLeft, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LivePreview } from './Editor';

const devices = [
  { key: 'desktop', icon: Monitor, width: '100%' },
  { key: 'tablet', icon: Tablet, width: '768px' },
  { key: 'mobile', icon: Smartphone, width: '375px' },
] as const;

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject } = useProjects();
  const navigate = useNavigate();
  const [device, setDevice] = useState<string>('desktop');
  const selectedWidth = devices.find(d => d.key === device)?.width || '100%';

  if (!currentProject) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">No project loaded</div>;

  return (
    <div className="h-screen flex flex-col bg-muted/30">
      <header className="border-b border-border bg-card h-14 flex items-center px-4 gap-3 shrink-0">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/editor/${id}`)}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Editor
        </Button>
        <span className="font-display font-bold">{currentProject.name}</span>
        <div className="mx-auto flex gap-1 bg-muted rounded-lg p-1">
          {devices.map(d => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              className={`p-2 rounded-md transition-colors ${device === d.key ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <d.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <Button size="sm" className="gradient-bg text-primary-foreground" onClick={() => navigate(`/deploy/${id}`)}>
          <Rocket className="w-4 h-4 mr-1" /> Deploy
        </Button>
      </header>
      <div className="flex-1 overflow-auto flex justify-center p-6">
        <div
          className="bg-card rounded-xl shadow-2xl overflow-hidden transition-all duration-500 border border-border h-fit"
          style={{ width: selectedWidth, maxWidth: '100%' }}
        >
          <LivePreview
            type={currentProject.type}
            content={currentProject.content || {}}
            name={currentProject.name || 'My Website'}
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;

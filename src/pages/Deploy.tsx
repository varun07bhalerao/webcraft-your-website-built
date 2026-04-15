import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import { Rocket, ExternalLink, Globe, ArrowLeft, CheckCircle2, Loader2, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { buildStaticSiteZip, deployToNetlify } from '@/lib/netlifyDeploy';
import { toast } from 'sonner';

const hosts = [
  { id: 'netlify', name: 'Netlify', desc: 'Automatic deployments with CDN', color: 'from-teal-400 to-emerald-500' },
  { id: 'firebase', name: 'Firebase Hosting', desc: 'Google-backed free hosting (Coming Soon)', color: 'from-amber-400 to-orange-500' },
  { id: 'vercel', name: 'Vercel', desc: 'Edge network deployment (Coming Soon)', color: 'from-gray-700 to-gray-900' },
];

const Deploy = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject } = useProjects();
  const navigate = useNavigate();

  const [activeHost, setActiveHost] = useState<string | null>(null);
  const [netlifyToken, setNetlifyToken] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  const handleDeployNetlify = async () => {
    if (!currentProject) return;
    if (!netlifyToken.trim()) {
      toast.error('Please provide a Netlify Personal Access Token');
      return;
    }

    setIsDeploying(true);
    try {
      toast.info('Compiling website architecture...');
      const zipBlob = await buildStaticSiteZip(currentProject);
      
      toast.info('Uploading to Netlify...');
      const url = await deployToNetlify(zipBlob, netlifyToken.trim());
      
      setDeployedUrl(url);
      toast.success('Successfully deployed to Netlify!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  if (deployedUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
         <div className="w-full max-w-lg text-center animate-fade-in bg-card p-10 rounded-3xl border border-border">
           <div className="w-24 h-24 rounded-full bg-success/20 mx-auto flex items-center justify-center mb-8 animate-float">
             <CheckCircle2 className="w-12 h-12 text-success" />
           </div>
           <h1 className="text-3xl font-display font-bold mb-4">Deployment Complete!</h1>
           <p className="text-muted-foreground mb-8">
             Your website is now live globally on Netlify's CDN.
           </p>
           
           <a 
            href={deployedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-6 bg-muted/50 rounded-xl border border-border border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all mb-8 group"
           >
             <Globe className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
             <span className="font-semibold text-lg">{deployedUrl.replace('https://', '')}</span>
             <ExternalLink className="w-5 h-5 text-muted-foreground" />
           </a>

           <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mb-6 animate-float">
          <Rocket className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-3xl font-display font-bold text-center">Deploy Your Website</h1>
        </div>
        <p className="text-muted-foreground mb-10 text-center">
          <span className="font-medium text-foreground">{currentProject?.name || 'Your Website'}</span> is ready to go live!
        </p>

        {!activeHost && (
          <div className="w-full space-y-3 mb-8">
            {hosts.map((h, i) => (
              <button
                key={h.id}
                onClick={() => h.id === 'netlify' && setActiveHost(h.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all text-left animate-fade-in ${h.id === 'netlify' ? 'hover:border-primary/50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                style={{ animationDelay: `${i * 100}ms` }}
                disabled={h.id !== 'netlify'}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${h.color} flex items-center justify-center shrink-0`}>
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{h.name}</div>
                  <div className="text-sm text-muted-foreground">{h.desc}</div>
                </div>
                {h.id === 'netlify' && <ArrowRightIcon />}
              </button>
            ))}
          </div>
        )}

        {activeHost === 'netlify' && (
          <div className="w-full animate-fade-in bg-card p-6 rounded-2xl border border-border shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-2">Netlify Configuration</h3>
            <p className="text-sm text-muted-foreground mb-6">Create a Personal Access Token in your Netlify account settings to give WebCraft permission to deploy statically compiled sites on your behalf.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Personal Access Token</label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input 
                    type="password"
                    placeholder="Enter auth token..." 
                    value={netlifyToken}
                    onChange={e => setNetlifyToken(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setActiveHost(null)}>Cancel</Button>
                <Button 
                  className="flex-1 gradient-bg text-white" 
                  onClick={handleDeployNetlify}
                  disabled={isDeploying || !netlifyToken}
                >
                  {isDeploying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Rocket className="w-4 h-4 mr-2" />}
                  {isDeploying ? 'Deploying...' : 'Push to Netlify'}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center w-full">
          <Button variant="ghost" onClick={() => navigate(`/editor/${id}`)}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Editor
          </Button>
        </div>
      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default Deploy;

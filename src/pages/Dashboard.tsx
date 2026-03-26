import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { Plus, Globe, LogOut, Trash2, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const typeColors: Record<string, string> = {
  business: 'bg-business/10 text-business',
  portfolio: 'bg-portfolio/10 text-portfolio',
  education: 'bg-education/10 text-education',
  event: 'bg-event/10 text-event',
  blog: 'bg-blog/10 text-blog',
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { projects, createProject, deleteProject, setCurrentProject } = useProjects();
  const navigate = useNavigate();

  const handleNew = () => {
    navigate(`/wizard/new/details`);
  };

  const handleOpen = (p: typeof projects[0]) => {
    setCurrentProject(p);
    navigate(`/editor/${p.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-bold">WebCraft</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.displayName || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-display font-bold">My Websites</h1>
            <p className="text-muted-foreground mt-1">Manage and create your website projects</p>
          </div>
          <Button onClick={handleNew} className="gradient-bg text-primary-foreground gap-2 h-11 px-6">
            <Plus className="w-4 h-4" /> New Website
          </Button>
        </div>

        {projects.filter(p => p.name && p.name.trim() !== '').length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl gradient-bg mx-auto flex items-center justify-center mb-6">
              <Globe className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">No websites yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Create your first website and bring your ideas to life in minutes.
            </p>
            <Button onClick={handleNew} className="gradient-bg text-primary-foreground gap-2">
              <Plus className="w-4 h-4" /> Create Your First Website
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.filter(p => p.name && p.name.trim() !== '').map((p, i) => (
              <div
                key={p.id}
                className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => handleOpen(p)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${typeColors[p.type] || 'bg-muted text-muted-foreground'}`}>
                    {p.type}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); deleteProject(p.id); }}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-1">{p.name || 'Untitled Website'}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-3 h-3" />
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-primary text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                  Open Editor <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

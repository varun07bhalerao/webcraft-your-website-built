import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Layers, Zap, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-bold">WebCraft</span>
          </div>
          <Button onClick={() => navigate('/auth')} className="gradient-bg text-primary-foreground gap-1">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-24 md:py-36 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
          <Zap className="w-3.5 h-3.5" /> The Ultimate Website Builder
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          Build Stunning<br />
          <span className="gradient-text">Websites Without Code</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
          From idea to live website in minutes. Choose a template, customize with our visual editor, and deploy instantly.
        </p>
        <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <Button onClick={() => navigate('/auth')} size="lg" className="gradient-bg text-primary-foreground h-13 px-8 text-base font-semibold gap-2">
            Start Building Free <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-24">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Layers, title: '5 Website Types', desc: 'Business, Portfolio, Education, Event, and Blog — each with unique design themes.' },
            { icon: Palette, title: 'Visual Editor', desc: 'Real-time split-screen editor with live preview. See changes as you type.' },
            { icon: Zap, title: 'Instant Deploy', desc: 'One-click deployment to Firebase, Netlify, or Vercel. Go live in seconds.' },
          ].map((f, i) => (
            <div key={f.title} className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${(i + 4) * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl gradient-bg mx-auto flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebCraft. Built with ❤️
        </div>
      </footer>
    </div>
  );
};

export default Index;

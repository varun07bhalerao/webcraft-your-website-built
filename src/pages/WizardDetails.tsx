import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import { ArrowRight, Upload, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WizardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { updateProject, currentProject } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: currentProject?.name || '',
    email: currentProject?.email || '',
    phone: currentProject?.phone || '',
    address: currentProject?.address || '',
  });

  const handleNext = () => {
    if (!id) return;
    updateProject(id, form);
    navigate(`/wizard/${id}/type`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg">WebCraft</span>
          <span className="ml-auto text-sm text-muted-foreground">Step 1 of 3</span>
        </div>

        <h1 className="text-3xl font-display font-bold mb-2">Website Details</h1>
        <p className="text-muted-foreground mb-8">Tell us about your website</p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Website Name *</label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="My Amazing Website" className="h-12" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Logo</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload logo</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contact Email</label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@example.com" className="h-12" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 234 567 890" className="h-12" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Address</label>
              <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="City, Country" className="h-12" />
            </div>
          </div>
        </div>

        <Button onClick={handleNext} disabled={!form.name} className="w-full mt-8 h-12 gradient-bg text-primary-foreground font-semibold gap-2">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WizardDetails;

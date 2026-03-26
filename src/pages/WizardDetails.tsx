import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import { ArrowRight, Upload, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const WizardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { updateProject, currentProject, createProject, setCurrentProject, projects } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      const projectToLoad = currentProject?.id === id ? currentProject : projects.find(p => p.id === id);
      if (projectToLoad) {
        if (!currentProject || currentProject.id !== id) {
          setCurrentProject(projectToLoad);
        }
        setForm({
          name: projectToLoad.name || '',
          email: projectToLoad.email || '',
          phone: projectToLoad.phone || '',
          address: projectToLoad.address || '',
          logo: projectToLoad.logo || '',
        });
      }
    } else if (id === 'new') {
      if (currentProject) setCurrentProject(null);
    }
  }, [id, currentProject, projects, setCurrentProject]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const uploadLogoToCloudinary = async (file: File) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary configuration missing in .env");
      return null;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      return json.secure_url;
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload logo to Cloudinary");
      return null;
    }
  };

  const handleNext = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !id) return;
    
    setUploading(true);
    let finalForm = { ...form };

    if (logoFile) {
      const logoUrl = await uploadLogoToCloudinary(logoFile);
      if (logoUrl) {
         finalForm = { ...finalForm, logo: logoUrl };
      }
    }

    if (id === 'new') {
      const newId = createProject(finalForm);
      navigate(`/wizard/${newId}/type`);
    } else {
      updateProject(id, finalForm);
      navigate(`/wizard/${id}/type`);
    }
    setUploading(false);
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
            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer block">
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {logoFile ? logoFile.name : (form.logo ? 'Logo Uploaded - Click to Change' : 'Click to upload logo (Optional)')}
              </p>
            </label>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contact Email *</label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="hello@example.com" className="h-12" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone *</label>
              <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 234 567 890" className="h-12" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Address *</label>
              <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="City, Country" className="h-12" required />
            </div>
          </div>
        </div>

        <Button onClick={handleNext} disabled={!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || uploading} className="w-full mt-8 h-12 gradient-bg text-primary-foreground font-semibold gap-2">
          {uploading ? 'Uploading...' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WizardDetails;

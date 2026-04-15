import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects, WebsiteType } from '@/contexts/ProjectContext';
import { useEditorStore } from '@/stores/editorStore';
import { themesRegistry, SchemaField } from '@/lib/schemaRegistry';
import { Eye, Globe, ArrowLeft, Rocket, Plus, Tag, Settings, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { WebsiteTemplate } from '@/templates/TemplateSystem';

const editorAccents: Record<WebsiteType, string> = {
  business: 'border-business/20',
  portfolio: 'border-portfolio/20',
  education: 'border-education/20',
  event: 'border-event/20',
  blog: 'border-blog/20',
};

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const { currentProject, updateProject, projects, setCurrentProject } = useProjects();
  const store = useEditorStore();
  const navigate = useNavigate();

  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newTemplateType, setNewTemplateType] = useState('home');

  // Load current project if missing (e.g. page refresh)
  useEffect(() => {
    if (!currentProject && projects.length > 0 && id) {
      const p = projects.find(proj => proj.id === id);
      if (p) setCurrentProject(p);
    }
  }, [id, currentProject, projects, setCurrentProject]);

  // Load project pages into store
  useEffect(() => {
    if (currentProject && currentProject.pages) {
      const isLoadedForThisProject = store.pages.length > 0 && store.pages.some(p => p.id === currentProject.pages[0]?.id);
      if (!isLoadedForThisProject) {
        store.setPages(currentProject.pages);
        if (currentProject.pages.length > 0) {
          store.setCurrentPageId(currentProject.pages[0].id);
        }
        store.setActiveSidebarTab('page');
      }
    }
  }, [currentProject, store]);

  // Debounced save
  useEffect(() => {
    if (store.pages.length > 0 && id) {
      const timer = setTimeout(() => {
        updateProject(id, { pages: store.pages });
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.pages, id]);

  const type = currentProject?.type || 'business';
  const currentPage = store.pages.find(p => p.id === store.currentPageId) || store.pages[0];
  const content = currentPage?.content || {};
  const links = currentPage?.links || {};

  const themeConfig = themesRegistry[type];
  const activeSchema = store.activeSidebarTab === 'global' 
    ? themeConfig?.globalSchema || [] 
    : themeConfig?.pageTemplates[currentPage?.templateType || 'home']?.schema || [];

  const handleUpdateField = (key: string, value: any) => {
    if (!currentPage) return;
    const [section, field] = key.split('.');
    if (store.activeSidebarTab === 'global') {
      store.updateGlobalContent(section, field, value);
    } else {
      store.updatePageContent(currentPage.id, section, field, value);
    }
  };

  const handleUpdateLink = (fieldKey: string, targetPageId: string) => {
    if (!currentPage) return;
    store.setPageFieldLink(currentPage.id, fieldKey, targetPageId);
  };

  const handleAddPage = () => {
    if (!newPageName) return;
    const newPageId = crypto.randomUUID();
    store.addPage({
      id: newPageId,
      name: newPageName,
      path: `/${newPageName.toLowerCase().replace(/\\s+/g, '-')}`,
      templateType: newTemplateType,
      content: { ...content }, // Or clear it for a fresh slate
      links: {}
    });
    setIsAddPageOpen(false);
    setNewPageName('');
    store.setCurrentPageId(newPageId);
    store.setActiveSidebarTab('page');
  };

  if (!currentPage) return <div className="h-screen flex items-center justify-center">Loading editor...</div>;

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
        
        {/* Pages Dropdown */}
        <div className="ml-8 flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Editing:</span>
          <Select 
            value={store.activeSidebarTab === 'global' ? 'global' : (store.currentPageId || undefined)} 
            onValueChange={(v) => {
              if (v === 'global') {
                store.setActiveSidebarTab('global');
              } else {
                store.setCurrentPageId(v);
                store.setActiveSidebarTab('page');
              }
            }}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Select a page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global" className="font-bold text-primary border-b mb-1">🌍 Global Settings</SelectItem>
              {store.pages.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name} ({p.templateType})</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isAddPageOpen} onOpenChange={setIsAddPageOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8" title="Add New Page">
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Page Name</label>
                  <Input value={newPageName} onChange={e => setNewPageName(e.target.value)} placeholder="e.g. Our Story" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Template Type</label>
                  <Select value={newTemplateType} onValueChange={setNewTemplateType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(themeConfig?.pageTemplates || {}).map(pt => (
                        <SelectItem key={pt.id} value={pt.id}>{pt.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPageOpen(false)}>Cancel</Button>
                <Button onClick={handleAddPage}>Create Page</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
        {/* Left panel Schema Renderer */}
        <div className={`w-[400px] border-r \${editorAccents[type]} bg-card overflow-y-auto flex flex-col`}>
          <div className="flex border-b border-border px-4 py-3 items-center gap-2 bg-muted/30">
            {store.activeSidebarTab === 'global' ? <Settings className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {store.activeSidebarTab === 'global' ? 'Global Schema' : `${currentPage.name} Schema`}
            </h2>
          </div>
          
          <div className="p-5 space-y-6 flex-1">
            {activeSchema.map((fieldSchema, i) => (
              <SchemaRenderer
                key={fieldSchema.key + i}
                schema={fieldSchema}
                content={content}
                links={links}
                availablePages={store.pages}
                onUpdate={(v) => handleUpdateField(fieldSchema.key, v)}
                onLinkUpdate={(targetPageId) => handleUpdateLink(fieldSchema.key.replace('.', '_'), targetPageId)}
              />
            ))}
            {activeSchema.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No configurations available for this schema.</p>
            )}
          </div>
        </div>

        {/* Right panel - live preview */}
        <div className="flex-1 bg-muted/30 overflow-y-auto w-full relative">
          <WebsiteTemplate 
            type={type} 
            templateIndex={currentProject?.template || 0}
            content={content} 
            name={currentProject?.name || 'My Website'} 
            logo={currentProject?.logo}
            pages={store.pages}
            onNavigate={(pageId) => {
              store.setCurrentPageId(pageId);
              store.setActiveSidebarTab('page');
            }}
            onGlobalEdit={(region) => {
              store.setActiveSidebarTab('global');
            }}
          />
        </div>
      </div>
    </div>
  );
};

function SchemaRenderer({ 
  schema, 
  content, 
  links, 
  availablePages, 
  onUpdate, 
  onLinkUpdate 
}: { 
  schema: SchemaField;
  content: Record<string, any>;
  links: Record<string, string>;
  availablePages: any[];
  onUpdate: (val: any) => void;
  onLinkUpdate: (targetPageId: string) => void;
}) {
  const [section, fieldKey] = schema.key.split('.');
  const currentValue = content[section]?.[fieldKey];
  const linkTargetPageId = links[schema.key.replace('.', '_')];

  if (schema.type === 'array') {
    const items = currentValue || [];
    return (
      <div className="space-y-4 pb-4 border-b border-border/50">
        <label className="text-sm font-semibold">{schema.label}</label>
        {items.map((item: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input 
              value={item} 
              onChange={e => {
                const newItems = [...items];
                newItems[i] = e.target.value;
                onUpdate(newItems);
              }} 
              className="h-9 text-sm shadow-sm" 
            />
          </div>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2" 
          onClick={() => onUpdate([...items, `New ${schema.label} Item`])}
        >
          <Plus className="w-4 h-4 mr-2"/> Add Item
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">{schema.label}</label>
        
        {schema.type === 'string' && schema.label.toLowerCase().includes('cta') && (
          <Select value={linkTargetPageId || 'none'} onValueChange={(v) => onLinkUpdate(v === 'none' ? '' : v)}>
            <SelectTrigger className="h-6 w-[140px] text-xs px-2 border-dashed bg-muted/30">
              <Tag className="w-3 h-3 mr-1" />
              <SelectValue placeholder="Link to..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" className="text-xs text-muted-foreground">No Link</SelectItem>
              {availablePages.map(p => (
                <SelectItem key={p.id} value={p.id} className="text-xs">{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {schema.type === 'textarea' ? (
        <Textarea 
          value={currentValue || ''} 
          onChange={e => onUpdate(e.target.value)} 
          rows={3} 
          className="text-sm shadow-sm"
        />
      ) : (
        <Input 
          value={currentValue || ''} 
          onChange={e => onUpdate(e.target.value)} 
          className="h-9 text-sm shadow-sm" 
        />
      )}
    </div>
  );
}

export default Editor;

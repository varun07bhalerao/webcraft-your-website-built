export type FieldType = 'string' | 'textarea' | 'array';

export interface SchemaField {
  type: FieldType;
  key: string;       // the dot notation path to value, e.g. 'home.headline'
  label: string;
}

export interface PageTemplateConfig {
  id: string;        // 'home', 'about', 'services', 'contact', 'custom'
  name: string;      // "Home Layout"
  schema: SchemaField[];
}

export interface ThemeConfig {
  themeId: string;
  globalSchema: SchemaField[];
  pageTemplates: Record<string, PageTemplateConfig>;
}

const standardGlobalSchema: SchemaField[] = [
  { type: 'string', key: 'contact.title', label: 'Footer Title' },
  { type: 'string', key: 'contact.email', label: 'Global Email' },
  { type: 'string', key: 'contact.phone', label: 'Global Phone' }
];

const standardPageTemplates: Record<string, PageTemplateConfig> = {
  'home': {
    id: 'home',
    name: 'Home Landing Layout',
    schema: [
      { type: 'string', key: 'home.headline', label: 'Headline' },
      { type: 'textarea', key: 'home.subtext', label: 'Subtext' },
      { type: 'string', key: 'home.cta', label: 'CTA Button Text' }
    ]
  },
  'about': {
    id: 'about',
    name: 'About Company Layout',
    schema: [
      { type: 'string', key: 'about.title', label: 'Title' },
      { type: 'textarea', key: 'about.text', label: 'Description' }
    ]
  },
  'services': {
    id: 'services',
    name: 'Services / Products Layout',
    schema: [
      { type: 'string', key: 'services.title', label: 'Section Title' },
      { type: 'array', key: 'services.items', label: 'Service Items' }
    ]
  },
  // We can add more generic layouts later
};

// Currently, all 25 themes share identical structural rendering capabilities in the Template Component level.
// We map them universally.
export const themesRegistry: Record<string, ThemeConfig> = {
  business: {
    themeId: 'business',
    globalSchema: standardGlobalSchema,
    pageTemplates: standardPageTemplates
  },
  portfolio: {
    themeId: 'portfolio',
    globalSchema: standardGlobalSchema,
    pageTemplates: standardPageTemplates
  },
  education: {
    themeId: 'education',
    globalSchema: standardGlobalSchema,
    pageTemplates: standardPageTemplates
  },
  event: {
    themeId: 'event',
    globalSchema: standardGlobalSchema,
    pageTemplates: standardPageTemplates
  },
  blog: {
    themeId: 'blog',
    globalSchema: standardGlobalSchema,
    pageTemplates: standardPageTemplates
  }
};

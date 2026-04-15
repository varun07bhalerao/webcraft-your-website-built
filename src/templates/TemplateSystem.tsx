import React from 'react';
import { WebsiteType, WebsitePage } from '@/contexts/ProjectContext';
import { 
  BusinessTemplate1, BusinessTemplate2, BusinessTemplate3, BusinessTemplate4, BusinessTemplate5 
} from './BusinessTemplates';
import { 
  PortfolioTemplate1, PortfolioTemplate2, PortfolioTemplate3, PortfolioTemplate4, PortfolioTemplate5 
} from './PortfolioTemplates';
import { 
  EducationTemplate1, EducationTemplate2, EducationTemplate3, EducationTemplate4, EducationTemplate5 
} from './EducationTemplates';
import { 
  EventTemplate1, EventTemplate2, EventTemplate3, EventTemplate4, EventTemplate5 
} from './EventTemplates';
import { 
  BlogTemplate1, BlogTemplate2, BlogTemplate3, BlogTemplate4, BlogTemplate5 
} from './BlogTemplates';

interface WebsiteTemplateProps {
  type: WebsiteType;
  templateIndex: number;
  content: Record<string, any>;
  name: string;
  logo?: string;
  pages?: WebsitePage[];
  onNavigate?: (pageId: string) => void;
  onGlobalEdit?: (region: string) => void;
}

export const WebsiteTemplate: React.FC<WebsiteTemplateProps> = ({ type, templateIndex, content, name, logo, pages, onNavigate, onGlobalEdit }) => {
  const brandDisplay = logo ? <img src={logo} alt={name} className="h-8 inline-block object-contain" /> : name as any;
  const renderTemplate = () => {
    switch (type) {
      case 'business':
        switch (templateIndex) {
          case 0: return <BusinessTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 1: return <BusinessTemplate2 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 2: return <BusinessTemplate3 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 3: return <BusinessTemplate4 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 4: return <BusinessTemplate5 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          default: return <BusinessTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
        }
      case 'portfolio':
        switch (templateIndex) {
          case 0: return <PortfolioTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 1: return <PortfolioTemplate2 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 2: return <PortfolioTemplate3 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 3: return <PortfolioTemplate4 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 4: return <PortfolioTemplate5 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          default: return <PortfolioTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
        }
      case 'education':
        switch (templateIndex) {
          case 0: return <EducationTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 1: return <EducationTemplate2 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 2: return <EducationTemplate3 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 3: return <EducationTemplate4 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 4: return <EducationTemplate5 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          default: return <EducationTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
        }
      case 'event':
        switch (templateIndex) {
          case 0: return <EventTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 1: return <EventTemplate2 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 2: return <EventTemplate3 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 3: return <EventTemplate4 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 4: return <EventTemplate5 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          default: return <EventTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
        }
      case 'blog':
        switch (templateIndex) {
          case 0: return <BlogTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 1: return <BlogTemplate2 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 2: return <BlogTemplate3 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 3: return <BlogTemplate4 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          case 4: return <BlogTemplate5 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
          default: return <BlogTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
        }
      default:
        return <BusinessTemplate1 name={brandDisplay} logo={logo} pages={pages} content={content} onNavigate={onNavigate} onGlobalEdit={onGlobalEdit} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      {renderTemplate()}
    </div>
  );
};

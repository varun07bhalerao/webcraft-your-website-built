import React from 'react';
import { WebsiteType } from '@/contexts/ProjectContext';
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
}

export const WebsiteTemplate: React.FC<WebsiteTemplateProps> = ({ type, templateIndex, content, name }) => {
  const renderTemplate = () => {
    switch (type) {
      case 'business':
        switch (templateIndex) {
          case 0: return <BusinessTemplate1 name={name} content={content} />;
          case 1: return <BusinessTemplate2 name={name} content={content} />;
          case 2: return <BusinessTemplate3 name={name} content={content} />;
          case 3: return <BusinessTemplate4 name={name} content={content} />;
          case 4: return <BusinessTemplate5 name={name} content={content} />;
          default: return <BusinessTemplate1 name={name} content={content} />;
        }
      case 'portfolio':
        switch (templateIndex) {
          case 0: return <PortfolioTemplate1 name={name} content={content} />;
          case 1: return <PortfolioTemplate2 name={name} content={content} />;
          case 2: return <PortfolioTemplate3 name={name} content={content} />;
          case 3: return <PortfolioTemplate4 name={name} content={content} />;
          case 4: return <PortfolioTemplate5 name={name} content={content} />;
          default: return <PortfolioTemplate1 name={name} content={content} />;
        }
      case 'education':
        switch (templateIndex) {
          case 0: return <EducationTemplate1 name={name} content={content} />;
          case 1: return <EducationTemplate2 name={name} content={content} />;
          case 2: return <EducationTemplate3 name={name} content={content} />;
          case 3: return <EducationTemplate4 name={name} content={content} />;
          case 4: return <EducationTemplate5 name={name} content={content} />;
          default: return <EducationTemplate1 name={name} content={content} />;
        }
      case 'event':
        switch (templateIndex) {
          case 0: return <EventTemplate1 name={name} content={content} />;
          case 1: return <EventTemplate2 name={name} content={content} />;
          case 2: return <EventTemplate3 name={name} content={content} />;
          case 3: return <EventTemplate4 name={name} content={content} />;
          case 4: return <EventTemplate5 name={name} content={content} />;
          default: return <EventTemplate1 name={name} content={content} />;
        }
      case 'blog':
        switch (templateIndex) {
          case 0: return <BlogTemplate1 name={name} content={content} />;
          case 1: return <BlogTemplate2 name={name} content={content} />;
          case 2: return <BlogTemplate3 name={name} content={content} />;
          case 3: return <BlogTemplate4 name={name} content={content} />;
          case 4: return <BlogTemplate5 name={name} content={content} />;
          default: return <BlogTemplate1 name={name} content={content} />;
        }
      default:
        return <BusinessTemplate1 name={name} content={content} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
      {renderTemplate()}
    </div>
  );
};

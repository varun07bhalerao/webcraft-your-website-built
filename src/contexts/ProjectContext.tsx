import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export type WebsiteType = 'business' | 'portfolio' | 'education' | 'event' | 'blog';

export interface WebsiteProject {
  id: string;
  name: string;
  type: WebsiteType;
  template: number;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  content: Record<string, any>;
}

interface ProjectContextType {
  projects: WebsiteProject[];
  currentProject: WebsiteProject | null;
  createProject: () => string;
  updateProject: (id: string, data: Partial<WebsiteProject>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (p: WebsiteProject | null) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<WebsiteProject[]>([]);
  const [currentProject, setCurrentProject] = useState<WebsiteProject | null>(null);

  const storageKey = user ? `webcraft_projects_${user.uid}` : null;

  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) setProjects(JSON.parse(stored));
      else setProjects([]);
    } else {
      setProjects([]);
    }
  }, [storageKey]);

  const save = (p: WebsiteProject[]) => {
    setProjects(p);
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(p));
  };

  const createProject = () => {
    const id = crypto.randomUUID();
    const p: WebsiteProject = {
      id, name: '', type: 'business', template: 0,
      createdAt: new Date().toISOString(), content: {}
    };
    save([...projects, p]);
    setCurrentProject(p);
    return id;
  };

  const updateProject = (id: string, data: Partial<WebsiteProject>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    save(updated);
    if (currentProject?.id === id) setCurrentProject({ ...currentProject, ...data });
  };

  const deleteProject = (id: string) => {
    save(projects.filter(p => p.id !== id));
    if (currentProject?.id === id) setCurrentProject(null);
  };

  return (
    <ProjectContext.Provider value={{ projects, currentProject, createProject, updateProject, deleteProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

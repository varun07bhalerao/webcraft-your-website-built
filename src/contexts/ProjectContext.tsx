import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

export type WebsiteType = 'business' | 'portfolio' | 'education' | 'event' | 'blog';

export interface WebsitePage {
  id: string;
  name: string;
  path: string;
  templateType: string;
  content: Record<string, any>;
  links?: Record<string, string>;
}

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
  content?: Record<string, any>; // Deprecated
  pages: WebsitePage[];
}

interface ProjectContextType {
  projects: WebsiteProject[];
  currentProject: WebsiteProject | null;
  createProject: (initialData?: Partial<WebsiteProject>) => string;
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

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.uid && db) {
        try {
          const q = query(collection(db, `users/${user.uid}/projects`));
          const snap = await getDocs(q);
          const loaded: WebsiteProject[] = [];
          snap.forEach((d) => {
            const data = d.data() as WebsiteProject;
            if (!data.pages || data.pages.length === 0) {
              data.pages = [
                {
                  id: crypto.randomUUID(),
                  name: 'Home',
                  path: '/',
                  templateType: 'home',
                  content: data.content || {}
                }
              ];
            }
            loaded.push(data);
          });
          setProjects(loaded);
        } catch (err) {
          console.error("Error fetching projects:", err);
          toast.error("Failed to load your projects.");
        }
      } else {
        setProjects([]);
      }
    };
    fetchProjects();
  }, [user]);

  const saveToFirestore = async (p: WebsiteProject) => {
    if (!user?.uid || !db) return;
    try {
      await setDoc(doc(db, `users/${user.uid}/projects/${p.id}`), p);
    } catch (err) {
      console.error("Firestore sync error:", err);
    }
  };

  const deleteFromFirestore = async (id: string) => {
    if (!user?.uid || !db) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/projects/${id}`));
    } catch (err) {
      console.error("Firestore sync error:", err);
    }
  };

  const createProject = (initialData?: Partial<WebsiteProject>) => {
    const id = crypto.randomUUID();
    const p: WebsiteProject = {
      id, 
      name: '', 
      type: 'business', 
      template: 0,
      createdAt: new Date().toISOString(), 
      content: {},
      pages: [
        {
          id: crypto.randomUUID(),
          name: 'Home',
          path: '/',
          templateType: 'home',
          content: {}
        }
      ],
      ...(initialData || {})
    };
    setProjects(prev => [...prev, p]);
    setCurrentProject(p);
    saveToFirestore(p);
    return id;
  };

  const updateProject = (id: string, data: Partial<WebsiteProject>) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, ...data };
          // We'll call saveToFirestore here for simplicity and to ensure we have the absolute latest 'p'
          // but we'll do it in a way that doesn't block.
          saveToFirestore(updated);
          return updated;
        }
        return p;
      });
      return next;
    });

    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...data } : null);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProject?.id === id) setCurrentProject(null);
    deleteFromFirestore(id);
  };

  return (
    <ProjectContext.Provider value={{ projects, currentProject, createProject, updateProject, deleteProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

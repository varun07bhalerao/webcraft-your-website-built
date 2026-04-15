import { create } from 'zustand';
import { WebsitePage } from '@/contexts/ProjectContext';

interface EditorState {
  pages: WebsitePage[];
  currentPageId: string | null;
  setPages: (pages: WebsitePage[]) => void;
  setCurrentPageId: (id: string | null) => void;
  addPage: (page: WebsitePage) => void;
  activeSidebarTab: string;
  setActiveSidebarTab: (tab: string) => void;
  updatePageContent: (pageId: string, section: string, field: string, value: any) => void;
  updateGlobalContent: (section: string, field: string, value: any) => void;
  updatePageMeta: (pageId: string, meta: Partial<WebsitePage>) => void;
  setPageFieldLink: (pageId: string, fieldKey: string, targetPageId: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  pages: [],
  currentPageId: null,

  setPages: (pages) => set({ pages }),
  
  setCurrentPageId: (id) => set({ currentPageId: id }),

  addPage: (page) => set((state) => ({
    pages: [...state.pages, page],
    currentPageId: page.id,
    activeSidebarTab: 'page'
  })),

  activeSidebarTab: 'page',
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),

  updatePageContent: (pageId, section, field, value) => set((state) => ({
    pages: state.pages.map(p => {
      if (p.id === pageId) {
        return {
          ...p,
          content: {
            ...p.content,
            [section]: {
              ...(p.content[section] || {}),
              [field]: value
            }
          }
        };
      }
      return p;
    })
  })),

  updateGlobalContent: (section, field, value) => set((state) => ({
    pages: state.pages.map(p => ({
      ...p,
      content: {
        ...p.content,
        [section]: {
          ...(p.content[section] || {}),
          [field]: value
        }
      }
    }))
  })),

  updatePageMeta: (pageId, meta) => set((state) => ({
    pages: state.pages.map(p => p.id === pageId ? { ...p, ...meta } : p)
  })),

  setPageFieldLink: (pageId, fieldKey, targetPageId) => set((state) => ({
    pages: state.pages.map(p => {
      if (p.id === pageId) {
        return {
          ...p,
          links: {
            ...(p.links || {}),
            [fieldKey]: targetPageId
          }
        };
      }
      return p;
    })
  }))
}));

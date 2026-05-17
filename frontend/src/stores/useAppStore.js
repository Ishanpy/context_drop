import { create } from "zustand";

const useAppStore = create((set) => ({
  selectedLens: "developer",

  selectedRepo: "context_drop",

  question: "",

  messages: [],

  activeFile: null,

  searchQuery: "",

  isLoading: false,

  isStreaming: false,

  sidebarOpen: true,

  mobileSidebarOpen: false,


  setQuestion: (value) =>
    set({ question: value }),
  
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        message,
    ],
  })),

    clearMessages: () =>
      set({ messages: [] }),


  setActiveFile: (file) =>
    set({ activeFile: file }),

  setSearchQuery: (query) =>
    set({ searchQuery: query }),

  setSelectedLens: (lens) =>
    set({ selectedLens: lens }),

  setSelectedRepo: (repo) =>
    set({ selectedRepo: repo }),

  setIsLoading: (value) =>
    set({ isLoading: value }),

  setIsStreaming: (value) =>
    set({ isStreaming: value }),

  toggleSidebar: () =>
    set((state) => ({
        sidebarOpen: !state.sidebarOpen,
  })),
  toggleMobileSidebar: () =>
    set((state) => ({
        mobileSidebarOpen:
            !state.mobileSidebarOpen,
  })),
}));

export default useAppStore;
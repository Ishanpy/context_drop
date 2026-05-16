import { create } from "zustand";

const useAppStore = create((set) => ({
  selectedLens: "developer",

  selectedRepo: "context_drop",

  question: "",

  responses: [],

  isLoading: false,

  isStreaming: false,

  sidebarOpen: true,

  mobileSidebarOpen: false,


  setQuestion: (value) =>
    set({ question: value }),

  setResponses: (responses) =>
    set({ responses }),

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
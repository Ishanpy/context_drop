import { create } from "zustand";

const useAppStore = create((set) => ({
  selectedLens: "developer",

  selectedRepo: "context_drop",

  question: "",

  responses: [],

  isLoading: false,

  isStreaming: false,

  sidebarOpen: true,

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

  toggleSidebar: () =>
    set((state) => ({
        sidebarOpen: !state.sidebarOpen,
  })),
}));

export default useAppStore;
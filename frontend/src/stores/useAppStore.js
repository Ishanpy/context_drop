import { create } from "zustand";

const useAppStore = create((set) => ({

  /* =========================
     GLOBAL APP STATE
  ========================= */

  selectedLens: "developer",

  selectedRepo: "context_drop",

  question: "",

  /* =========================
     CHAT SYSTEM
  ========================= */

  messages: [],

  isLoading: false,

  isStreaming: false,

  /* =========================
     REPOSITORY EXPLORER
  ========================= */

  activeFile: null,

  searchQuery: "",

  /* =========================
     SIDEBAR STATE
  ========================= */

  sidebarOpen: true,

  mobileSidebarOpen: false,

  /* =========================
     QUESTION INPUT
  ========================= */

  setQuestion: (value) =>
    set({ question: value }),

  /* =========================
     CHAT ACTIONS
  ========================= */

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        message,
      ],
    })),

  clearMessages: () =>
    set({ messages: [] }),

  setLoading: (value) =>
    set({ isLoading: value }),

  setStreaming: (value) =>
    set({ isStreaming: value }),

  /* =========================
     REPOSITORY EXPLORER
  ========================= */

  setActiveFile: (file) =>
    set({ activeFile: file }),

  setSearchQuery: (query) =>
    set({ searchQuery: query }),

  /* =========================
     LENS + REPOSITORY
  ========================= */

  setSelectedLens: (lens) =>
    set({ selectedLens: lens }),

  setSelectedRepo: (repo) =>
    set({ selectedRepo: repo }),

  /* =========================
     SIDEBAR ACTIONS
  ========================= */

  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen:
        !state.sidebarOpen,
    })),

  toggleMobileSidebar: () =>
    set((state) => ({
      mobileSidebarOpen:
        !state.mobileSidebarOpen,
    })),

}));

export default useAppStore;
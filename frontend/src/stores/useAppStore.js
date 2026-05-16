import { create } from "zustand";

const useAppStore = create((set) => ({
  selectedLens: "developer",

  selectedRepo: "context_drop",

  isLoading: false,

  setSelectedLens: (lens) =>
    set({ selectedLens: lens }),

  setSelectedRepo: (repo) =>
    set({ selectedRepo: repo }),

  setIsLoading: (value) =>
    set({ isLoading: value }),
}));

export default useAppStore;
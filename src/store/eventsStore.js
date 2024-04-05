import { create } from "zustand";
export const useStore = create((set) => ({
  originalEvents: [],
  cities: [],
  categories: [],
  searchResults: [],
  sortAsc: [],
  sort: [],

  setOriginalEvents: (originalEvents) =>
    set((state) => ({
      ...state,
      originalEvents: originalEvents,
    })),
  setCities: (cities) =>
    set((state) => ({
      ...state,
      cities: cities,
    })),
  setCategories: (categories) =>
    set((state) => ({
      ...state,
      categories: categories,
    })),
  setSearchResults: (searchResults) =>
    set((state) => ({
      ...state,
      searchResults: searchResults,
    })),
}));

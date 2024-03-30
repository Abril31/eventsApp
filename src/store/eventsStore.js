import { create } from "zustand";
export const useStore = create((set) => ({
  originalEvents: [],
  cities: [],
  categories: [],
  currentPage: 1,
  totalEvents: 31,
  originalData: [],
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
  setCurrentPage: (page) =>
    set((state) => ({
      ...state,
      currentPage: page,
    })),
  setTotalEvents: (total) =>
    set((state) => ({
      ...state,
      totalEvents: total,
    })),
  setOriginalData: (data) =>
    set((state) => ({
      ...state,
      originalData: data,
    })),
}));

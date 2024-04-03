import { create } from "zustand";
export const usePaginationStore = create((set) => ({
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
}));

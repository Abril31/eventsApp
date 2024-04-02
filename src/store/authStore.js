import { create } from 'zustand';

export const authStore = create((set) => ({
  token: null,
  setToken: (newToken) => {
    set({ token: newToken }); 
  },
  removeToken: () => {
    set({ token: null });
  },
}));
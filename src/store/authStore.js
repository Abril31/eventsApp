import { create } from 'zustand';

export const authStore = create((set) => ({
  token: null,
  setToken: (newToken) => {
    set({ token: newToken }); // NOTA: Debes pasar newToken como argumento
  },
  removeToken: () => {
    set({ token: null });
  },
}));
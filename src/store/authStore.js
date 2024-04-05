import { create } from 'zustand';
import  axios  from 'axios';

export const useAuthStore = create((set) => ({
  user: {
    id_user: '',
    name: '',
    email: '',
    image: '',
  },
  isLogged: false,
  isRegistering: false,
  registerSuccess: false,

  login: (userData) => {
    set({ user: userData, isLogged: true });
    localStorage.setItem(
      'login',
      JSON.stringify({ user: userData, isLogged: true })
    );
  },

  register: async (userData) => {
    set({
      isRegistering: true,
      registerSuccess: false,
    });
  
    try {
      console.log("data",userData)
      const response = await axios.post(`http://localhost:3001/api/v1/register`, userData);
      const newUser = response.data;
  
      set({
        isRegistering: false,
        registerSuccess: true,
        user: {
          id_user: newUser.id_user, // Utiliza el ID proporcionado en la respuesta de la solicitud de registro
          name: newUser.name,
          email: newUser.email,
          image: newUser.image || '',
        
        }, });
        localStorage.setItem(
          'authState',
          JSON.stringify({ user: newUser,  registerSuccess: true})
        );
      console.log("pruebau",newUser)  
  
    } catch (error) {
      set({ isRegistering: false, registerSuccess: false });
      alert('Registration failed. Please try again.');
    }
  },
  logout: () => {
    set({ user: null, isLogged: false });
    localStorage.removeItem('authState');
  },
}));
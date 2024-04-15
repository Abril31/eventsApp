import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

export const useAuthStore = create((set) => {
  const initialState = () => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      return JSON.parse(storedState);
    }
    return {
      user: {
        id_user: "",
        name: "",
        email: "",
        image: "",
      },
      isLogged: false,
      isRegistering: false,
      registerSuccess: false,
    };
  };

  return {
    ...initialState(),

    authgoogle: (userData) => {
      set({ user: userData, isLogged: true });
      localStorage.setItem(
        "authState",
        JSON.stringify({
          user: userData,
          isLogged: true,
        })
      );
    },

    login: (userData) => {
      const {
        access,
        name,
        email,
        password,
        type_user,
        status,
        image,
        id_user,
      } = userData;
      set({ user: userData, isLogged: true });
      localStorage.setItem(
        "authState",
        JSON.stringify({
          user: {
            access,
            name,
            email,
            password,
            type_user,
            status,
            image,
            id_user,
          },
          isLogged: true,
        })
      );
    },

    register: async (userData) => {
      set({
        isRegistering: true,
        registerSuccess: false,
      });

      try {
        const response = await axios.post(
          `http://localhost:3001/api/v1/register`,
          userData
        );
        const newUser = response.data;

        set({
          isRegistering: false,
          registerSuccess: true,
          user: {
            id_user: newUser.id_user,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image || "",
          },
        });
        localStorage.setItem(
          "authState",
          JSON.stringify({ user: newUser, registerSuccess: true })
        );
      } catch (error) {
        set({ isRegistering: false, registerSuccess: false });
        toast.error("Registration failed. Please try again.");
      }
    },

    logout: () => {
      set({ user: null, isLogged: false });
      localStorage.removeItem("authState");
      localStorage.removeItem("login");
      localStorage.removeItem("userData");
    },
  };
});

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
      // Realizar una solicitud POST para registrar al usuario en la base de datos
      axios.post("http://localhost:3001/api/v1/register", userData)
        .then((response) => {
          // Registro exitoso, realizar una solicitud de inicio de sesión
          console.log("Datos del usuario después del registro:", userData); // Registrar los datos del usuario después del registro exitoso
          axios.post("http://localhost:3001/api/v1/login", userData)
            .then((response) => {
              // El usuario ha iniciado sesión correctamente
              const { user_id } = response.data;
              console.log("el id",response.data) // Obtener el id_user de la respuesta de inicio de sesión
              userData.id_user = user_id; // Asignar el id_user al objeto userData
                
              set({ user: userData, isLogged: true });
              localStorage.setItem(
                "authState",
                JSON.stringify({
                  user: userData,
                  isLogged: true,
                })
              );
              localStorage.setItem("userData", JSON.stringify(userData)); // Guardar los datos del usuario en el localStorage
              window.location.replace('/');
              
            })
            .catch((error) => {
              // Error al iniciar sesión
              console.error("Error al iniciar sesión:", error);
            });
        })
        .catch((error) => {
          // Error al registrar al usuario
          console.error("Error al registrar al usuario:", error);
        });
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
      localStorage.removeItem("authStateLogin");
    },
  };
});

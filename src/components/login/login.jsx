import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore"; // Importa useAuthStore
import { isValidEmail, isValidPassword } from "./validation";
import AuthgoogleLogin from "./authgoogleLogin";
import api from "../../api/events";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Utiliza el método login proporcionado por useAuthStore

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataObj = JSON.parse(userData);
      login(userDataObj);
      navigate("/");
    }
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.indexOf("@") === -1) {
      toast.error("Please, use a valid email address with @ symbol.");
      return;
    }
    if (password.trim() === "") {
      toast.error("Please, enter your password.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please, enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      login(response.data);
      // Guardar los datos del usuario en localStorage al iniciar sesión
      localStorage.setItem("userData", JSON.stringify(response.data)); // Llama al método login con el email y la contraseña
      console.log("localStorage--->", localStorage.userData);
      navigate("/");
    } catch (error) {
      if (!isValidPassword(password)) {
        toast.error("Incorrect Password.");
        return;
      }
      console.error("Error en el login:", error);
    }
  };

  return (
    <div className="login-container justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Mail:
            </label>
            <input
              className="block w-full bg-gray-200 border-gray-300 rounded py-2 px-4 text-gray-700"
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password:
            </label>
            <input
              className="block w-full bg-gray-200 border-gray-300 rounded py-2 px-4 text-gray-700"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="block w-full bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out duration-150"
              type="submit"
            >
              Login
            </button>
          </div>
          {/* Componente de autenticación de Google */}
          <AuthgoogleLogin />
        </form>
      </div>
    </div>
  );
}

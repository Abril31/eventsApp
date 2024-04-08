import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore"; // Importa useAuthStore
import { isValidEmail, isValidPassword } from "./validation";
import Authgoogle from "./authgoogle";
import api from "../../api/events";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Utiliza el método login proporcionado por useAuthStore

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      login(response.data); // Llama al método login con el email y la contraseña
      navigate("/");
    } catch (error) {
      if (!isValidPassword(password)) {
        alert("Incorrect Password.");
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
              type="email"
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
              log in
            </button>
          </div>
          {/* Componente de autenticación de Google */}
          <Authgoogle />
        </form>
      </div>
    </div>
  );
}

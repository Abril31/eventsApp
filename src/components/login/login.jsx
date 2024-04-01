import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import { isValidEmail, isValidPassword } from './validation'; // Importa las funciones de validación

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = authStore(); // Utiliza el método set proporcionado por authStore

  const handleSubmit = (e) => {
    e.preventDefault();

   if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Incorrect Password.');
      return;
    }

    axios
      .post('http://localhost:3001/api/v1/login', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        setToken({ token }); 
      navigate('/');
      })
      .catch((error) => {
        console.error('Error en el login:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <label className="block text-gray-700" htmlFor="email">         
          Mail
        </label>
        <input
          className="block w-full bg-gray-200 text-gray-700 border-gray-300 rounded py-2 px-4"
          type="email"
          id="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mt-4 text-gray-700" htmlFor="password">
          Password:
        </label>
        <input
          className="block w-full bg-gray-200 text-gray-700 border-gray-300 rounded py-2 px-4"
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="block w-full bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out duration-150"
          type="submit"
          onClick={handleSubmit}
        >
            log in
        </button>
      </div>
    </div>
  );
}
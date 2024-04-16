import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword, isValidname,isValidImage } from './validation';
import { toast } from "sonner";


export default function RegistrationForm() {
  const [name, setName] = useState(''); // Cambiado de 'fullName' a 'name'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!isValidname(name)) {
      toast.error('Please enter your full name.');
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
  
    if (!isValidPassword(password)) {
      toast.error('Password should be at least 6 characters long.');
      return;
    }
    if (!isValidImage(image)) {
      toast.error('Por favor ingresa una URL de imagen válida.');
      return;
    }
  
    const userData = {
      name,
      email,
      password,
      image,
    
    };
  
    try {
      await register(userData);
      navigate('/');
      toast.message("Successful registration")
      setErrorMessage('');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message || 'Registration failed.'
        : 'Unable to reach the server. Please check your connection.';
      setErrorMessage(errorMessage);
    }
  };
  return (
    <div className="registration-page justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-center">Register</h1>
        <div className="grid grid-cols-1 gap-y-4">
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="full-name">
              Full Name:
            </label>
            <input
              className="block w-full bg-gray-200 border-gray-300 rounded py-2 px-4 text-gray-700"
              type="text"
              id="full-name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="email">
              Email:
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
          <div className="col-span-1">
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
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="image">
              Image:
            </label>
            <input
              className="block w-full bg-gray-200 border-gray-300 rounded py-2 px-4 text-gray-700"
              type="text"
              id="image"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && (
              <img
                className="mt-2"
                src={image}
                alt="User Image"
                style={{ maxWidth: '100px' }}
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-red-500">{errorMessage}</p>
        </div>
        <button
          className="block w-full bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700 transition ease-in-out duration-150"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
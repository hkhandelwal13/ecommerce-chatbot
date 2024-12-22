'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';
import axios from 'axios';
import { Header } from './Header.jsx';
export function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          username,
          password,
        });

        if (response.data.access) {
          console.log('Login successful:', response.data)
          onLogin(response.data.access); // Call onLogin with the received token
          navigate('/chat'); // Redirect to the chat interface after successful login
        } else {
          setError('Invalid login credentials.');
        }
      } catch (error) {
        setError('An error occurred during login. Please try again.');
        console.error(error);
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  return (
    <>
    <Header></Header>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="px-8 py-6 mt-4 text-left bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-200">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-700" type="submit">Login</button>
            </div>
          </div>
        </form>

        {error && (
          <p className="mt-4 text-sm text-center text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          New user?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline dark:text-blue-400">
            Sign up here
          </button>
        </p>
      </div>
    </div>
    </>
   
  );
}

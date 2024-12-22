import { useState, useEffect } from 'react';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Dynamic imports using React.lazy
const Login = lazy(() => import('./components/Login.jsx').then((module) => ({ default: module.Login })));
const Signup = lazy(() => import('./components/Signup.jsx').then((module) => ({ default: module.Signup })));
const ChatInterface = lazy(() => import('./components/ChatInterface.jsx').then((module) => ({ default: module.ChatInterface })));
const Header = lazy(() => import('./components/Header.jsx').then((module) => ({ default: module.Header })));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    toast.success('Login successful!'); // Toast success message
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.info('You have been logged out.'); // Toast info message
  };

  const handleSignup = () => {
    toast.success('Signup successful! You can now log in.'); // Toast success message
  };

  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
          <ToastContainer />
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Navigate to="/chat" />} />
                  <Route
                    path="/chat"
                    element={
                      <>
                      <div>
                      
                        <ChatInterface  onLogout={handleLogout} />
                      </div>
                       
                      </>
                    }
                  />
                </>
              ) : (
                <>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                </>
              )}
              {/* Fallback route for undefined paths */}
              <Route path="*" element={<Navigate to={isAuthenticated ? '/chat' : '/login'} />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;

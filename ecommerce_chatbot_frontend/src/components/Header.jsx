'use client'

import { useDarkMode } from '../contexts/DarkModeContext.jsx'
import { Moon, Sun } from 'lucide-react'

export function Header({ onLogout }) {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <header className="bg-blue-600  dark:bg-blue-800 text-white p-4 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Uplyft Chatbot</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-500 dark:bg-blue-700 text-white"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
         
        </div>
      </div>
    </header>
  )
}
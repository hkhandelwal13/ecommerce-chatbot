'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';

export function ChatInterface({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();

  const apiBaseUrl = 'http://127.0.0.1:8000/api/products/';

  // Load messages from localStorage on first load
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      initializeChat(); // Initialize chat if no previous messages exist
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Function to initialize chat with greeting and prompts
  const initializeChat = () => {
    const initialMessage = {
      id: uuidv4(),
      text: 'Hi there! How can I assist you today? Here are some suggestions:',
      sender: 'bot',
      timestamp: new Date(),
      prompts: ['List all products', 'Search for Product 1', 'Filter by Electronics', 'Filter by Toys', 'Filter by Clothing ', 'Filter by Books', 'Filter by Home Appliances',],
    };
    setMessages([initialMessage]);
  };

  const handleSendMessage = async (e, prompt = null) => {
    e?.preventDefault();

    let userMessage = (prompt || inputMessage);

    if (!userMessage.trim()) return;
    const newMessage = {
      id: uuidv4(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    userMessage = userMessage.trim().toLowerCase();
    console.log(userMessage, "user message");
    try {
      let botResponse;

      if (userMessage.toLowerCase() === 'list all products') {
        const response = await axios.get(apiBaseUrl);
        if (response.data.length > 0) {
          const productList = response.data.map((p) => p.name).join(', ');
          botResponse = {
            id: uuidv4(),
            text: `Here are the products: ${productList}`,
            sender: 'bot',
            timestamp: new Date(),
            prompts: response.data.map((p) => `Details for ${p.name}`),
        
            showAsCards: true, // Add clickable prompts for details
          };
        } else {
          botResponse = {
            id: uuidv4(),
            text: 'No products available.',
            sender: 'bot',
            timestamp: new Date(),
          };
        }
      } else if (userMessage.trim().toLowerCase().startsWith('search for')) {
        const searchQuery = userMessage.split('search for')[1].trim();
        console.log(searchQuery, "Hello");
        const response = await axios.get(`${apiBaseUrl}?search=${searchQuery}`);
        console.log(response, "Hello I am res");
        if (response.data.length > 0) {
          botResponse = {
            id: uuidv4(),
            text: `Results for '${searchQuery}': ${response.data.map((p) => p.name).join(', ')}`,
            sender: 'bot',
            timestamp: new Date(),
            prompts: response.data.map((p) => `Details for ${p.name}`),
            showAsCards: true, 
          };
        } else {
          botResponse = {
            id: uuidv4(),
            text: `No products found for '${searchQuery}'.`,
            sender: 'bot',
            timestamp: new Date(),
          };
        }
      } else if (userMessage.trim().toLowerCase().startsWith('filter by')) {
        const category = userMessage.split('filter by')[1].trim();
        const response = await axios.get(`${apiBaseUrl}?category=${category}`);
        if (response.data.length > 0) {
          botResponse = {
            id: uuidv4(),
            text: `Products in '${category}': ${response.data.map((p) => p.name).join(', ')}`,
            sender: 'bot',
            timestamp: new Date(),
            prompts: response.data.map((p) => `Details for ${p.name}`),
            showAsCards: true, 
          };
        } else {
          botResponse = {
            id: uuidv4(),
            text: `No products found in category '${category}'.`,
            sender: 'bot',
            timestamp: new Date(),
            prompts: response.data.map((p) => `Details for ${p.name}`),
          };
        }
      } else if (userMessage.trim().toLowerCase().startsWith('details for')) {
        const productName = userMessage.split('details for')[1].trim();
        const formattedProductName = productName.toLowerCase().replace(/\s+/g, ' '); // Format the product name to avoid issues with spacing
        const response = await axios.get(`${apiBaseUrl}?search=${formattedProductName}`);
        if (response.data.length > 0) {
          const product = response.data[0]; // Assuming the name is unique
          botResponse = {
            id: uuidv4(),
            text: `Here are the details for '${product.name}':`,
             sender: 'bot',
            timestamp: new Date(),
            details: product,
      prompts: ['List all products', 'Search for Product 1', 'Filter by Electronics', 'Filter by Toys', 'Filter by Clothing ', 'Filter by Books', 'Filter by Home Appliances',],
            
          };
          
        } else {
          botResponse = {
            id: uuidv4(),
            text: `No details found for '${productName}'.`,
            sender: 'bot',
            timestamp: new Date(),
          };
        }
      } else {
        botResponse = {
          id: uuidv4(),
          text: `I'm sorry, I didn't understand that. Try using one of the prompts for help.`,
          sender: 'bot',
          timestamp: new Date(),
      prompts: ['List all products', 'Search for Product 1', 'Filter by Electronics', 'Filter by Toys', 'Filter by Clothing ', 'Filter by Books', 'Filter by Home Appliances',],

        };
      }

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        id: uuidv4(),
        text: 'Something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleResetConversation = () => {
    initializeChat();
    localStorage.removeItem('chatMessages');
  };

  const handleLogout = () => {
    localStorage.removeItem('chatMessages'); // Clear the chat messages for the current session
    onLogout(); // Perform parent-provided logout function
  };

  return (
    <div className="container flex flex-col mx-auto p-4 h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Uplyft Chatbot</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-blue-500 dark:bg-blue-700 text-white"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 dark:bg-blue-200 dark:text-blue-800"
          >
            Logout
          </button>
          <button
            onClick={handleResetConversation}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-auto  bg-gray-100 dark:bg-gray-800 rounded-lg p-4 scrollbar-thin  scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-400 scrollbar-track-light dark:scrollbar-track-sky-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {message.text}
              {message.details && (
                <>
                
                <div className="mt-4 bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:text-white">
                  <h3 className="font-bold text-xl">{message.details.name}</h3>
                  <p><strong>Price:</strong> ${message.details.price}</p>
                  <p><strong>Description:</strong> {message.details.description}</p>
                  <p><strong>Category:</strong> {message.details.category}</p>
                </div>
                </>
              )}
              {message.prompts && Array.isArray(message.prompts) && (
                <div className="mt-2">
                  {message.prompts.map((prompt, index) => {
                    // Ensure prompt is a string and render
                    const promptText = typeof prompt === 'string' ? prompt : `${prompt.name}`;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(null, promptText)}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-2 py-1 rounded m-1 hover:bg-gray-300 dark:hover:bg-gray-700"
                      >
                        {promptText}
                      </button>
                    );
                  })}
                  
                </div>
              )}
              
            </div>
            <div className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Send 🔼
        </button>
      </form>
    </div>
  );
}

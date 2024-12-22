
---

# E-Commerce Sales Chatbot

## Project Overview

In the competitive world of e-commerce, enhancing customer experience is crucial. This project focuses on developing an advanced, interactive sales chatbot for an e-commerce platform specializing in a specific product category. The chatbot helps users with product search, exploration, and purchase processes, making shopping seamless and intuitive.

## Features

### Frontend
- **Responsive Design**: Compatible with desktop, tablet, and mobile devices.
- **Authentication**: Login and sign-up functionality to secure user sessions.
- **Session Continuity**: Maintains user state throughout interactions.
- **Chat Interface**: Includes conversation reset buttons and session tracking with timestamps.
- **Product Visualization**: Displays products innovatively for efficient exploration.

### Backend
- **RESTful API**: Processes user queries and fetches product data.
- **Mock Inventory**: A database with 100+ e-commerce product entries.
- **Error Handling**: Robust error handling to ensure seamless operations.

## Technology Stack

### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: For styling and ensuring a sleek design.

### Backend
- **Django**: Framework for backend logic and API handling.
- **Django Rest Framework (DRF)**: For creating RESTful APIs.
- **SQLite**: Lightweight database for the mock inventory.

## Chat Interface Implementation

### Overview
The chat interface is the core interaction point between the user and the e-commerce platform. It provides real-time responses to user queries and integrates seamlessly with the backend API to fetch product details and other information.

### Key Functionalities
1. **User Input Handling**:
   - Accepts user queries via a text input box.
   - Supports buttons for common actions (e.g., "Show all products," "Reset conversation").
   
2. **Backend Integration**:
   - Sends user queries to the backend using POST requests.
   - Displays chatbot responses fetched from backend APIs.
   
3. **Session Management**:
   - Tracks conversation history for the user session.
   - Allows resetting of conversations to start fresh.
   
4. **UI/UX Enhancements**:
   - Timestamped messages for better clarity.
   - Typing indicators to show chatbot activity.

## Setup Instructions

### Prerequisites
Ensure the following are installed:
- Node.js
- Python 3.x
- pip
- Virtual environment (optional)

### Backend Setup
1. Navigate to the backend directory: 
   ```bash
   cd ecommerce_chatbot_backend
   ```
2. Create and activate a virtual environment (optional): 
   ```bash
   python -m venv env
   source env/bin/activate  # Linux/MacOS
   env\Scripts\activate     # Windows
   ```
3. Install dependencies: 
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations: 
   ```bash
   python manage.py migrate
   ```
5. Populate the database with mock product data: 
   ```bash
   python manage.py populate_products
   ```
6. Start the server: 
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory: 
   ```bash
   cd ecommerce_chatbot_frontend
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Start the development server: 
   ```bash
   npm run dev
   ```

## Project Structure

### Backend (ecommerce_chatbot_backend)
- **ecommerce_chatbot**: Contains project settings and configurations.
- **products**: Includes models, views, serializers, and custom commands for managing products.
- **db.sqlite3**: Database file for storing mock product data.
- **manage.py**: CLI tool for backend operations.

### Frontend (ecommerce_chatbot_frontend)
- **src**: Contains all React components, contexts, and styles.
  - **components**: Chat interface, login, and header components.
  - **contexts**: Context for managing states like dark mode.
- **public**: Static assets.
- **vite.config.js**: Configuration for the Vite development server.

## Sample Queries

### Frontend Interaction
- User logs in and searches for a product using the chatbot. Below are some sample queries:
  - List all Products
  - Filter by Electronics
  - Search for Product 1
- Results are displayed in an interactive carousel.

### Backend API Endpoints
- **GET /products**: Fetch all products.
- **POST /products/search**: Search for products based on user queries.

## Challenges and Solutions

### Challenges
1. **Managing State Across Components**: Solved using React Context API.
2. **Error Handling in API Calls**: Implemented detailed error messages and fallbacks.
3. **Data Visualization**: Ensured responsive and visually appealing product displays.

### Solutions
- Leveraged modern frameworks and libraries for seamless development.
- Ensured modular and scalable architecture for future improvements.

---


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the import based on your App component's path
import './index.css'; // Optional: Your styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

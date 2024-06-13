import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FlagProvider from './context/FlagProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FlagProvider>
    <App />
  </FlagProvider>

  // </React.StrictMode>
);

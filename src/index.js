import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContext } from './providers/AuthContext';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n/config';
import { setupDefaultAdmin } from './lib/auth/setupAdmin';

// Configuration silencieuse du compte admin au démarrage
setupDefaultAdmin().catch(() => {
  // Ignorer les erreurs silencieusement car elles sont gérées dans setupDefaultAdmin
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext.jsx'; // Import the CartProvider
import { LanguageProvider } from './components/LanguageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      {/* Wrap the App component with CartProvider */}
      <CartProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </CartProvider>
    </HashRouter>
  </StrictMode>,
);
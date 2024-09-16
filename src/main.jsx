import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router.jsx';
import { RouterProvider } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const ShoppingCart = createContext();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShoppingCart.Provider value={[]}>
      <RouterProvider router={router} />
    </ShoppingCart.Provider>
  </StrictMode>
);

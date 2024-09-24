import { createContext, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

let localStorageCart = localStorage.getItem('cart');
if(localStorageCart){
  localStorageCart = JSON.parse(localStorageCart);
}
const storedCart = localStorageCart?.map((item) => JSON.parse(item));

export let ShoppingCart = createContext();
export default function App() {
  const [cart, setCart] = useState(storedCart || []);

  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.map((item) => JSON.stringify(item)))
    );
  }, [cart]);
  return (
    <ShoppingCart.Provider value={{ cart, setCart }}>
      <RouterProvider router={router} />
    </ShoppingCart.Provider>
  );
}

import React, { createContext, useContext, useState } from 'react';

// Create the localized shopping cart context
const LocalShoppingCartContext = createContext();

// Create the localized shopping cart provider component
const LocalShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Define the addToCart function
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <LocalShoppingCartContext.Provider value={{ cartItems, addToCart,clearCart }}>
      {children}
    </LocalShoppingCartContext.Provider>
  );
};

// Create a custom hook to access the localized shopping cart context
const useLocalShoppingCart = () => {
  const context = useContext(LocalShoppingCartContext);
  if (!context) {
    throw new Error('useLocalShoppingCart must be used within a LocalShoppingCartProvider');
  }
  return context;
};

export { LocalShoppingCartProvider, useLocalShoppingCart };

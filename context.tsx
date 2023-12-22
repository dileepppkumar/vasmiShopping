import React, { createContext, useContext, useState } from 'react';

const LocalShoppingCartContext = createContext();

const LocalShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

const useLocalShoppingCart = () => {
  const context = useContext(LocalShoppingCartContext);
  if (!context) {
    throw new Error('useLocalShoppingCart must be used within a LocalShoppingCartProvider');
  }
  return context;
};

export { LocalShoppingCartProvider, useLocalShoppingCart };

"use client";

import { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the cart context easily
export const useCart = () => useContext(CartContext);

// Create the provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        // If it exists, update the quantity (or just return the same array for now)
        // For simplicity, we'll just return the existing items.
        // You could add a quantity field and increment it here.
        return prevItems;
      } else {
        // If it's a new item, add it to the cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price || item.discountPriceINR) * item.quantity, 0);

  // The value object that will be provided to consumers
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
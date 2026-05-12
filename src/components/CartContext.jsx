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
      // Check if the item is already in the cart with the exact same ID, Size, and Color
      const existingItemIndex = prevItems.findIndex(item =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
      );

      if (existingItemIndex !== -1) {
        // If it exists, update the quantity
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // If it's a new item or new variant, add it to the cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Function to update quantity
  const updateQuantity = (index, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price || item.discountPriceINR) * item.quantity, 0);

  // The value object that will be provided to consumers
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
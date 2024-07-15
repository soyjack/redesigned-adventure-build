import React, { createContext, useState, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

/**
 * Custom hook to use the CartContext.
 * 
 * @returns {Object} The cart context value.
 */
export const useCart = () => useContext(CartContext);

/**
 * The CartProvider component provides cart state and methods to its children.
 * It uses the React Context API to manage the cart state and functions.
 * 
 * @param {Object} children - The child components that will consume the context.
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /**
   * Adds an item to the cart.
   * If the item already exists in the cart, it increases the quantity.
   * Otherwise, it adds the item to the cart with a quantity of 1.
   * 
   * @param {Object} item - The item to add to the cart.
   */
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Removes an item from the cart by its ID.
   * 
   * @param {number} itemId - The ID of the item to remove.
   */
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
  };

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Computes the total number of items in the cart.
   * 
   * @returns {number} The total quantity of items in the cart.
   */
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

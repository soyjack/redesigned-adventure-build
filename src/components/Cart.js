import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';

/**
 * The Cart component renders the items added to the cart.
 * It provides functionality to remove items and proceed to checkout.
 */
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Checkout successful!');
    clearCart();
  };

  return (
    <div className="cart">
      <h2 id='summry'>Your Cart Summary</h2>
      {cart.length > 0 ? (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.itemName}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p id="no-items-in-cart">No items in cart</p>
      )}
      {cart.length > 0 && (
        <button className="checkout-button" onClick={handleCheckout}>Check Out</button>
      )}
    </div>
  );
};

export default Cart;

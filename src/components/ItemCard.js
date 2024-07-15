import React, { useState } from 'react';
import './ItemCard.css';

/**
 * The ItemCard component displays the details of an item.
 * It allows users to view the item image, description, price, and seller information,
 * and provides an option to add the item to the cart.
 * 
 * @param {Object} item - The item details to display.
 * @param {Function} onAddToCart - Function to add the item to the cart.
 */
const ItemCard = ({ item, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setAddedToCart(true);
  };

  return (
    <div
      className="item-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        // Display item description when hovered
        <p className="item-description">{item.itemDescription}</p>
      ) : (
        // Display item image when not hovered
        <img src={item.imageName} alt={item.itemName} className="item-image" />
      )}
      <h3>{item.itemName}</h3>
      <p className="price">${item.price}</p> {/* Display price with dollar sign */}
      <button
        className={`add-to-cart-button ${addedToCart ? 'added' : ''}`}
        onClick={handleAddToCart}
      >
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
      <p className='seller'>Seller : {item.seller?.username}</p> {/* Display seller information */}
    </div>
  );
};

export default ItemCard;

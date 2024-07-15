import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { useCart } from './CartContext';
import './Dashboard.css';

const Dashboard = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/itemposts/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error('Unauthorized');
          return;
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.seller?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onAddToCart={addToCart} />
          ))
        ) : (
          <p id="no-items-found">No items found</p>
        )}
      </div>
      <footer className="footer">
        <p> TradeShop.com, Inc © {new Date().getFullYear()}  All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import './Profile.css';

/**
 * The Profile component displays the user's posts and provides functionality
 * to create, edit, and delete posts.
 */
const Profile = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({ itemName: '', itemDescription: '', price: '', imageName: '' });
  const [newItem, setNewItem] = useState({ itemName: '', itemDescription: '', price: '', imageName: '' });

  /**
   * Fetch the user's posts from the server when the component mounts.
   */
  useEffect(() => {
    const fetchProfileItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        const response = await fetch(`http://localhost:8080/api/itemposts/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized');
          } else {
            console.error('Error fetching items:', response.statusText);
          }
          return;
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchProfileItems();
  }, []);

  /**
   * Handle deleting a post.
   * 
   * @param {number} itemId - The ID of the item to delete.
   */
  const handleDelete = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/api/itemposts/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setItems(items.filter(item => item.id !== itemId));
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  /**
   * Handle editing a post.
   * 
   * @param {Object} item - The item to edit.
   */
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setUpdatedItem({
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      price: item.price,
      imageName: item.imageName
    });
  };

  /**
   * Handle updating a post.
   * 
   * @param {number} itemId - The ID of the item to update.
   */
  const handleUpdate = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;
      const updatedPost = { ...updatedItem, price: Number(updatedItem.price), seller: { id: userId } };

      const response = await fetch(`http://localhost:8080/api/itemposts/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        setItems(items.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item)));
        setEditingItem(null);
      } else {
        console.error('Error updating item:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  /**
   * Handle input change for the updated item.
   * 
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  /**
   * Handle input change for the new item.
   * 
   * @param {Event} e - The input change event.
   */
  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  /**
   * Handle creating a new post.
   */
  const handleCreatePost = async () => {
    const token = localStorage.getItem('token');
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;

      const newPost = {
        ...newItem,
        price: Number(newItem.price),
        seller: {
          id: userId
        }
      };

      const response = await fetch(`http://localhost:8080/api/itemposts/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json();
        setItems([...items, createdPost]);
        setNewItem({ itemName: '', itemDescription: '', price: '', imageName: '' });
      } else {
        console.error('Error creating post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="profile">
      <h2>My Posts</h2>
      <div className="create-post">
        <h3>Create New Post</h3>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={newItem.itemName}
            onChange={handleNewItemChange}
            placeholder="Item Name"
          />
        </div>
        <div className="form-group">
          <label>Item Description</label>
          <textarea
            name="itemDescription"
            value={newItem.itemDescription}
            onChange={handleNewItemChange}
            placeholder="Item Description"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleNewItemChange}
            placeholder="Price"
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="imageName"
            value={newItem.imageName}
            onChange={handleNewItemChange}
            placeholder="Image URL"
          />
        </div>
        <button className="create-button" onClick={handleCreatePost}>Create Post</button>
      </div>
      <div className="separator"></div>
      <div className="item-list">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="item-card">
              {editingItem === item.id ? (
                <div className="edit-post">
                  <div className="form-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      value={updatedItem.itemName}
                      onChange={handleChange}
                      placeholder="Item Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Item Description</label>
                    <textarea
                      name="itemDescription"
                      value={updatedItem.itemDescription}
                      onChange={handleChange}
                      placeholder="Item Description"
                    />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={updatedItem.price}
                      onChange={handleChange}
                      placeholder="Price"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="imageName"
                      value={updatedItem.imageName}
                      onChange={handleChange}
                      placeholder="Image URL"
                    />
                  </div>
                  <button className="update-button" onClick={() => handleUpdate(item.id)}>Update</button>
                  <button className="update-button" onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <img src={item.imageName} alt={item.itemName} className="item-image" />
                  <h3>{item.itemName}</h3>
                  <p>{item.itemDescription}</p>
                  <p>Price: ${item.price}</p>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-items-found">No items found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

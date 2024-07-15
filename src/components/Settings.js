import React, { useEffect, useState } from 'react';
import './Settings.css';

/**
 * The Settings component allows users to update their profile information
 * and delete their account.
 */
const Settings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  /**
   * Fetch the user's current profile information when the component mounts.
   */
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId; // Assuming user ID is stored in 'userId' field

        const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setEmail(data.email);
        } else {
          console.error('Error fetching user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  /**
   * Handle updating the user's profile information.
   * 
   * @param {Event} event - The form submission event.
   */
  const handleUpdate = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId; // Assuming user ID is stored in 'userId' field

      const updatedInfo = {
        username,
        password,
        email,
      };

      const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Error updating profile');
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      alert('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  /**
   * Handle deleting the user's account.
   */
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId; // Assuming user ID is stored in 'userId' field

      const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        alert('Error deleting account');
        console.error('Error deleting account:', response.statusText);
      }
    } catch (error) {
      alert('Error deleting account');
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form onSubmit={handleUpdate} className="settings-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
      <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
    </div>
  );
};

export default Settings;

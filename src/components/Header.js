import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import { AuthContext } from './AuthContext';
import './Header.css';
import logo from './logo.png';

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemCount } = useCart();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="App-header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="dashboard-logo" />

        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-button">
              &times;
            </button>
          )}
        </div>

        <nav>
          <button className={`nav-button ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>Home</button>
          <button className={`nav-button ${isActive('/profile') ? 'active' : ''}`} onClick={() => navigate('/profile')}>Profile</button>
          <button className={`nav-button ${isActive('/settings') ? 'active' : ''}`} onClick={() => navigate('/settings')}>Settings</button>
          <button className={`nav-button ${isActive('/cart') ? 'active' : ''}`} onClick={() => navigate('/cart')}>Cart ({cartItemCount})</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

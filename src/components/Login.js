import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

/**
 * The Login component handles user authentication.
 * It provides a form for users to enter their username and password,
 * and handles the submission to the server.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  /**
   * Handles the form submission for user login.
   * Sends a POST request to the server with the entered username and password.
   * 
   * @param {Event} event - The form submission event.
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please fill in both username and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/authenticate/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect username or password. Try again');
      }

      const data = await response.json();

      if (!data.jwt) {
        throw new Error('Token not received');
      }

      localStorage.setItem('token', data.jwt);
      login(data.jwt);
      setError('');
      toast.success('Login successful', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  /**
   * Redirects the user to the registration page.
   */
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>TradeShop</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-redirect">
        Don't have an account? <button onClick={handleRegisterRedirect} className="register-button">Create an account</button>
      </p>
      {error && <p className="login-error">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default Login;

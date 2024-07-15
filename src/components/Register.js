import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

/**
 * The Register component handles user registration.
 * It provides a form for users to enter their username, password, and email,
 * and handles the submission to the server.
 */
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission for user registration.
   * Sends a POST request to the server with the entered username, password, and email.
   * 
   * @param {Event} event - The form submission event.
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/authenticate/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (response.ok) {
        setMessage('Registration successful');
        setError('');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  /**
   * Redirects the user to the login page.
   */
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
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
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="login-redirect">
        Already have an account? <button onClick={handleLoginRedirect} className="login-button">Login</button>
      </p>
      {message && <p className="register-message">{message}</p>}
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;

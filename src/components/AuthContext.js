import React, { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

/**
 * The AuthProvider component provides authentication state and methods to its children.
 * It uses the React Context API to manage authentication status and functions.
 * 
 * @param {Object} children - The child components that will consume the context.
 */
const AuthProvider = ({ children }) => {
  // Initialize the authentication state based on the presence of a token in local storage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  /**
   * Log in the user by saving the token and updating the authentication state.
   * 
   * @param {string} token - The authentication token.
   */
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  /**
   * Log out the user by removing the token and updating the authentication state.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import Cart from './Cart';
import Login from './Login';
import Header from './Header';

/**
 * The Routes component sets up the main routing for the application.
 * It includes the header and defines routes for various components.
 */
const Routes = () => {
  return (
    <Router>
      {/* Include the Header component for navigation */}
      <Header />
      <Switch>
        {/* Define routes for different components */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;

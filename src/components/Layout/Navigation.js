import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-store';
import {NavLink} from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = () => {
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authActions.logout());
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <NavLink activeClassName={classes.active} to="/" exact>Home</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink activeClassName={classes.active} to="/users">Users</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink activeClassName={classes.active} to="/meals">Meals</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

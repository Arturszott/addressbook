import React from 'react';
import './App.scss';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListPage from './features/list/ListPage';
import DetailsPage from './features/details/DetailsPage';
import SettingsPage from './features/settings/SettingsPage';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <ListPage />
          </Route>
        </Switch>
        <Route path="/details/:userId">
          <DetailsPage />
        </Route>
      </Router>
    </Provider>
  );
}

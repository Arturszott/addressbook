import React from 'react';
import './App.scss';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import List from './features/list';
import Details from './features/details';
import Settings from './features/settings';
import Search from './features/search';

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
          <Search />
        </header>

        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
        <Route path="/details/:userId">
          <Details />
        </Route>
      </Router>
    </Provider>
  );
}

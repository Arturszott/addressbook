import React from 'react';
import './App.scss';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});
const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">Start</div>;
    </Provider>
  );
}

export default App;

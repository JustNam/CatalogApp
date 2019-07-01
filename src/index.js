import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/stylesheet.css';
import promiseMiddleware from './middlewares/promise';
import item from './reducers/item';
import category from './reducers/category';
import user from './reducers/user';

const reducers = {
  category,
  item,
  user,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers),
  composeEnhancer(applyMiddleware(thunk, promiseMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

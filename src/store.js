
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promiseMiddleware from './middlewares/promise';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancer(applyMiddleware(thunk, promiseMiddleware))
);

export default store;
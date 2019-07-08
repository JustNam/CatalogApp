import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/stylesheet.css';
import Main from 'components/Main';
import store from 'store';
import { Router } from 'react-router';
import history from './history';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);

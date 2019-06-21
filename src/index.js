import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/stylesheet.css'


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
    composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));

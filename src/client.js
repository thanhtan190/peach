"use strict"

// React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';


import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';

const middleware = applyMiddleware(thunk, logger);

// pass initial state from server store
const initialState = window.INITIAL_STATE;

const store = createStore(reducers, initialState, middleware);

import routes from './routes';

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
  )
  
render(
Routes, document.getElementById('app')
);

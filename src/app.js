"use strict"

// React
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// React Route

import { Route, Router, IndexRoute, browserHistory} from 'react-router';

import { applyMiddleware, createStore } from "redux";

import logger from 'redux-logger';

import reducers from './reducers/index';

// Component
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';


const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm}></Route>
                <Route path="/cart" component={Cart}></Route>
            </Route>
        </Router>
    </Provider>
)

render (
    Routes, document.getElementById('app')
);
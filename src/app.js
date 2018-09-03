"use strict"

import React from 'react';

import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { applyMiddleware, createStore } from "redux";

import logger from 'redux-logger';

import reducers from './reducers/index';

import BooksList from './components/pages/booksList';

import Menu from './components/menu';

import Footer from './components/footer';

const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

render(
    <Provider store={store}>
        <div>
            <Menu />
            <BooksList />
            <Footer />
        </div>
    </Provider>,
    document.getElementById('app')
);
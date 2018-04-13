"use strict"

import React from 'react';

import {render} from 'react-dom';

import {Provider} from 'react-redux';

import { applyMiddleware, createStore } from "redux";

import logger from 'redux-logger';

import reducers from './reducers/index';

import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

import { addToCart } from "./actions/cartActions";

const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);

store.subscribe(function(){
    console.log('current state is:', store.getState());
})

import BooksList from './components/pages/booksList';

render(
    <Provider store={store}><BooksList /></Provider>,
    document.getElementById('app')
);

store.dispatch(
    postBooks(
        [{
            id: 1,
            title: 'book1',
            description: 'this is the book description',
            price: 30
        },{
            id: 2,
            title: 'book2',
            description: 'this is the book description',
            price: 50
        }]
    )   
)

store.dispatch(
    deleteBooks({id:1})
)

store.dispatch(
    updateBooks({
        id :2,
        title: 'updated book'
    })
)

store.dispatch(
    addToCart([{
        id : 2,
        price: 110,
    }])
)
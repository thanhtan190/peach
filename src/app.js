"use strict"

import { createStore } from "redux";

import reducers from './reducers/index';

const store = createStore(reducers)

store.subscribe(function(){
    console.log('current state is:', store.getState());
})

store.dispatch({
    type: "POST_BOOK",
    payload: [{
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
})

store.dispatch({
    type: "DELETE_BOOK",
    payload: {
        id : 1
    }
})

store.dispatch({
    type: "UPDATE_BOOK",
    payload: {
        id : 2,
        price: 100,
        title: 'I updated my book'
    }
})

store.dispatch({
    type: "ADD_TO_CART",
    payload: [{
        id : 2,
        price: 110,
    }]
})
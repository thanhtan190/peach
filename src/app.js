"use strict"

import { createStore } from "redux";

const reducer = function(state={books: []}, action) {
    switch(action.type){
        case 'POST_BOOK':
        return {books: [...state.books, ...action.payload]}
        break;
    }
    return state
}

const store = createStore(reducer)

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
    type: "POST_BOOK",
    payload: [{
        id: 3,
        title: 'book3',
        description: 'this is the book description',
        price: 60
    }]
})
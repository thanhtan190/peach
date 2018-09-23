'use strict';

import axios from 'axios';

// GET CART
export function getCart() {
    return function(dispatch) {
        axios.get('/api/cart')
            .then(function(resp){
                dispatch({
                    type: "GET_CART",
                    payload: resp.data
                })
            })
            .catch(function(err) {
                dispatch({
                    type: "GET_CART_REJECTED",
                    msg: "error when getting the cart from session"
                })
            })
    }
}

// ADD TO CART
export function addToCart(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then(function(resp){
                dispatch({
                    type: "ADD_TO_CART",
                    payload: resp.data
                })
            })
            .catch(function(err) {
                dispatch({
                    type: "ADD_TO_CART_REJECTED",
                    msg: "error when adding the cart"
                })
            })
    }
}

// UPDATE BOOK
export function updateCart(_id, unit, cart) {
    // create a copy of the current array of books
    const currentBookToUpdate = cart;
    // determine at which index in books array is the book to be deleted
    const indexToUpdate = currentBookToUpdate.findIndex(function(book) {
        return book._id === _id;
    });
    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + unit
    }

    let cartUpdate = [
        ...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1)
    ]

    return function(dispatch) {
        axios.post('/api/cart', cartUpdate)
            .then(function(resp){
                dispatch({
                    type: "UPDATE_CART",
                    payload: resp.data
                })
            })
            .catch(function(err) {
                dispatch({
                    type: "UPDATE_CART_REJECTED",
                    msg: "error when adding the cart"
                })
            })
    }
}

// DELETE FROM CART
export function deleteCartItem(cart) {
    return function(dispatch) {
        axios.post('/api/cart', cart)
            .then(function(resp){
                dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: resp.data
                })
            })
            .catch(function(err) {
                dispatch({
                    type: "DELETE_CART_ITEM_REJECTED",
                    msg: "error when deleting an item from the cart"
                })
            })
    }
}

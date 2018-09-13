'use strict'

import axios from 'axios';

// GET BOOK
export function getBooks() {
    return function(dispatch) {
        axios.get('/api/books')
            .then(function(res) {
                debugger;
                dispatch(
                    {
                        type: 'GET_BOOKS',
                        payload: res.data
                    }
                )
            })
            .catch(function(err) {
                dispatch(
                    {
                        type: "GET_BOOK_REJECTED",
                        payload: err
                    }
                )
            })
    }
}

// POST A BOOk
export function postBooks(book) {
    return function(dispatch) {
        axios.post('/api/books', book)
            .then(function(res) {
                dispatch(
                    {
                        type:"POST_BOOK",
                        payload:res.data
                    }
                )
            })
            .catch(function(err) {
                dispatch(
                    {
                        type: "POST_BOOK_REJECTED",
                        payload: "there was an error while posting a new book"
                    }
                )
            })
    }
}

// DELETE A BOOK
export function deleteBooks(id) {
    return function(dispatch) {
        axios.delete('/api/books/' + id)
            .then(function(res) {
                dispatch(
                    {
                        type:"DELETE_BOOK",
                        payload:id
                    }
                )
            })
            .catch(function(err) {
                dispatch(
                    {
                        type: "DELETE_BOOK_REJECTED",
                        payload: err
                    }
                )
            })
    }
}

export function updateBooks(book) {
    return {
        type: 'UPDATE_BOOK',
        payload: book
    }
}


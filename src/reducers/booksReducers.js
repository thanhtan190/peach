"use strict"

export function booksReducers(state={books:[{
    _id: 1,
    title: 'book1',
    description: 'this is the book1 description',
    price: 30
},{
    _id: 2,
    title: 'book2',
    description: 'this is the book2 description',
    price: 50
}]}, action) {
    switch(action.type){
        case 'GET_BOOKS':
            return {...state, books: [...state.books]};
        case 'POST_BOOK':
            return {books: [...state.books, ...action.payload]};
        case 'DELETE_BOOK':
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                return book._id === action.payload._id;
            });
            return {books: [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete+1)]}
        case 'UPDATE_BOOK':
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(function(book){
                return book._id === action.payload._id;
            });
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }
            console.log("what is it newBookToUpdate", 
                newBookToUpdate);

            return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate+1)]}
    }
    return state
}
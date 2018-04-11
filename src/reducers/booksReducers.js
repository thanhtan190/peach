"use strict"

export function booksReducers(state={books:[]}, action) {
    switch(action.type){
        case 'POST_BOOK':
            return {books: [...state.books, ...action.payload]};
        case 'DELETE_BOOK':
            const currentBookToDelete = [...state.books];
            const indexToDelete = currentBookToDelete.findIndex(function(book){
                return book.id === action.payload.id;
            });
            return {books: [...currentBookToDelete.slice(0, indexToDelete),...currentBookToDelete.slice(indexToDelete+1)]}
            break;
        case 'UPDATE_BOOK':
            const currentBookToUpdate = [...state.books];
            const indexToUpdate = currentBookToUpdate.findIndex(function(book){
                return book.id === action.payload.id;
            });
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            }
            console.log("what is it newBookToUpdate", 
                newBookToUpdate);

            return {books: [...currentBookToUpdate.slice(0, indexToDelete), newBookToUpdate, ...currentBookToUpdate.slice(indexToDelete+1)]}
            break;
    }
    return state
}
"use strict"

let mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
})

let Books = mongoose.model("Books", booksSchema);
module.exports = Books;
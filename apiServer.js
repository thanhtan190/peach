var express = require('express');
var path = require('path');
var logger = require('morgan');

// PROXY
const httpProxy = require('http-proxy');

var app = express();

// PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});
app.use('/api', function(req, res) {
  apiProxy.web(req, res);
});

// END PROXY

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Peach');

const Books = require('./models/books.js');

// -- POST BOOKS --
app.post('/books', function(req, res) {
  let book = req.body;

  Books.create(book, function(err, books) {
    if (err) throw err;
    res.json(books);
  });
});

// -- GET BOOKS --
app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    console.log("this is how books looks like", books)
    if (err) throw err;
    res.json(books);
  });
});

// -- DELETE BOOKS --
app.delete('/books/:_id', function(req, res) {
  let query = {_id: req.params._id};
  Books.remove(query, function(err, books) {
    if (err) throw err;
    res.json(books);
  });
});

// -- UPDATE BOOKS --
app.put('/books/:_id', function(req, res) {
  let book = req.body;
  const query = {_id: req.params._id};
  // if the field doesn't exist $set will set a new field
  const update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  }

  // when true return the updated doc
  const option = {
    new: true
  }

  Books.findByIdAndUpdate(query, update, option, function(err, books){
    if (err) throw err;
    res.json(books);
  });
});


// END APIs

app.listen(3001, function(err) {
  if(err) return console.log(err);
  console.log("API server is listening on http://localhost:3001");
});
"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// , { useNewUrlParser: true }
// APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Peach', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "#MongoDB - connection error: "));

// --- Set up SESSIONS ---
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milisecs
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60}), // ttl: 2days * 24h * 60mins * 60secs
}))

// --- Save SESSION cart API
app.post('/cart', function(req, res) {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) throw err;
    res.json(req.session.cart);
  })
});

// --- Get SESSION cart API
app.get('/cart', function(req, res) {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

const Books = require('./models/books.js');

// -- POST BOOKS --
app.post('/books', function(req, res) {
  let book = req.body;

  Books.create(book, function(err, books) {
    if (err) console.log("POST BOOKS ERROR ---------- ", err);
    res.json(books);
  });
});

// -- GET BOOKS --
app.get('/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      console.log("GET BOOKS ERROR ---------- ", err);
    }
    res.json(books);
  });
});

// -- DELETE BOOKS --
app.delete('/books/:_id', function(req, res) {
  let query = {_id: req.params._id};
  Books.remove(query, function(err, books) {
    if (err) console.log("DELETE BOOKS ERROR ---------- ", err);
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
    if (err) console.log("UPDATE BOOKS ERROR ---------- " + err);
    res.json(books);
  });
});

// -- GET BOOKS IMAGES APU --
app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images/';
  // require file system
  const fs = require('fs');
  // read all files in the directory
  fs.readdir(imgFolder, function(err, files) {
    if (err) return console.log(err);
    // create an empty array;
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name: file});
    });

    res.json(filesArr);
  })

})

// END APIs

app.listen(3001, function(err) {
  if(err) return console.log(err);
  console.log("API server is listening on http://localhost:3001");
});
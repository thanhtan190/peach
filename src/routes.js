"use strict"

// React
import React from 'react';
import { render } from 'react-dom';

// React Route

import { Route, Router, IndexRoute, browserHistory} from 'react-router';

// Component
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import About from './components/pages/about';
import Main from './main';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={BooksList}/>
            <Route path="/about" component={About}/>
            <Route path="/admin" component={BooksForm}/>
            <Route path="/cart" component={Cart}/>
        </Route>
    </Router>
);

export default routes;
  


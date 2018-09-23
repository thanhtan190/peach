'use strict'

import axios from 'axios';
// React
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import reducers from './src/reducers/index';
import routes from './src/routes';


function handlerRender(req, res) {
    axios.get('http://localhost:3001/books')
        .then(function(resp) {
            // let myHTML = JSON.stringify(resp.data);
            // res.render('index', {myHTML});

            // STEP-1 CREATE A REDUX STORE ON THE SERVER
            const store = createStore(reducers, {"books":{"books":resp.data}})

            // STEP-2 GET INITTIAL STATE FROM THE STORE
            const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

            // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTS AND DEFINE WHAT TO DO WITH THEM
            const Routes = {
                routes: routes,
                location: req.url
            }

            match(Routes, function(error, redirect, props) {
                if (error) {
                    res.status(500).send("Error fullfilling the request");
                } else if (redirect) {
                    res.status(302, redirect.pathname + redirect.search)
                } else if (props) {
                    const reactComponent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props} />
                        </Provider>
                    )
                    res.status(200).render('index', {reactComponent, initialState})
                } else {
                    res.status(404).send("Not Found")
                }
            });
        })
        .catch(function(err) {
            console.log('#Initial Server side rendering error', err)
        })
}

module.exports = handlerRender
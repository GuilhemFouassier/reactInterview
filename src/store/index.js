import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import movies from './movies';

const reducer = combineReducers({
    movies
})

const store = configureStore({ reducer, devTools: true, middleware: [thunk] });

export default store;

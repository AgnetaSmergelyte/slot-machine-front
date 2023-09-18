import React, {useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./features/user.js"

const store = configureStore({
    reducer: userReducer
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);



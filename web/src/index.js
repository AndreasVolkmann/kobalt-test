import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./js/reducers";
import {LocaleProvider} from "antd";
import enUS from "antd/lib/locale-provider/en_US";

const store = createStore(
    reducer, applyMiddleware(
        thunkMiddleware
    )
);

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <App store={store}/>
    </LocaleProvider>,
    document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./store";
import 'bootstrap/dist/css/bootstrap.css';
import UserService from "./services/UserService";


import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from './reducers';
const ContextA = React.createContext();

require('dotenv').config()

//initialize store
let store = createStore(rootReducer)

const renderApp = () => ReactDOM.render(
   <Provider context={ContextA} store={store} >
    <App  store={store}/>
  </Provider>, document.getElementById("root"));

UserService.initKeycloak(renderApp);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import searchReducer from "./store/reducers/search";
import messageReducer from "./store/reducers/message";
import TimeAgo from 'javascript-time-ago'

// import vi from 'javascript-time-ago/locale/vi'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
// TimeAgo.addDefaultLocale(vi)


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  search: searchReducer,
  message: messageReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

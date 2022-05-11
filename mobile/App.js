import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import searchReducer from "./store/reducers/search";
import HomeApp from './HomeApp';
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import {endpoint} from './apiURL'
import AsyncStorage from '@react-native-async-storage/async-storage';

// config auth axios
axios.defaults.baseURL= endpoint
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
      config.headers.accept= 'application/json'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

// config reducer - store
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  search: searchReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider store={store}>
      <HomeApp />
    </Provider>
  );
}


// export default App

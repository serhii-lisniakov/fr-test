import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { Provider } from 'react-redux';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB3jlugKsPeF07t-uZ-7DIQWaWGRCCjnTo",
    authDomain: "fr-test-543c3.firebaseapp.com",
    databaseURL: "https://fr-test-543c3.firebaseio.com",
    projectId: "fr-test-543c3",
    storageBucket: "fr-test-543c3.appspot.com",
    messagingSenderId: "496947034669",
    appId: "1:496947034669:web:9052323b6b8ce9488016a4"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

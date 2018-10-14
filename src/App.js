import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import LoginForm from "./components/LoginForm";
import ReduxThunk from "redux-thunk";
import Router from "./Router";
const firebase = require("firebase");

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAA_kM7qZvQ8LxLG4eWKX5A6bDVqAS_zlM",
      authDomain: "manager-6e3b3.firebaseapp.com",
      databaseURL: "https://manager-6e3b3.firebaseio.com",
      projectId: "manager-6e3b3",
      storageBucket: "manager-6e3b3.appspot.com",
      messagingSenderId: "45037528847"
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;

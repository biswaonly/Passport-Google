import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Home from "./components/Home";
import store from "./store";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

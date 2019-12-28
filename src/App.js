import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import Header from "./layout/Header";
import { connect } from "react-redux";

function App(props) {
  return props.user.isAuthenticated ? (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/" default component={Dashboard} />
        </Switch>
      </Router>
    </>
  ) : (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/" default component={Auth} />
        </Switch>
      </Router>
    </>
  );
}
const mapState = state => {
  return { user: state.user };
};

export default connect(mapState, null)(App);

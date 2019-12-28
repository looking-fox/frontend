import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import Header from "./layout/Header";
import { checkAuthStatus } from "./reducers/userSlice";
import { connect } from "react-redux";

class App extends Component {
  async componentDidMount() {
    await this.props.checkAuthStatus();
  }

  render() {
    //Return null if status not received yet
    if (this.props.user.isAuthenticated == null) return null;
    //Show router based on auth status
    return this.props.user.isAuthenticated ? (
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
}

const mapState = state => {
  return { user: state.user };
};

const mapDispatch = { checkAuthStatus };

export default connect(mapState, mapDispatch)(App);

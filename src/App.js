import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import SignInForm from "./components/Auth/SignInForm";
import PasswordReset from "./components/Auth/PasswordReset";
import Header from "./layout/Header";
import { checkAuthStatus } from "./thunks/userThunks";
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
            <Route path="/password-reset" exact component={PasswordReset} />
            <Route path="/" default component={SignInForm} />
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

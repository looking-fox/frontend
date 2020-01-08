import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkAuthStatus } from "./thunks/userThunks";
import { connect } from "react-redux";

import Header from "./layout/Header";
import SignInForm from "./components/Auth/SignInForm";
import PasswordReset from "./components/Auth/PasswordReset";
import Clients from "./views/Clients";
import Workflows from "./views/Workflows";
import { Toast } from "./ui/StyledComponents";

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
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Clients} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/" default component={Clients} />
          </Switch>
        </Router>
        <Toast
          show={this.props.toast.showToast}
          success={this.props.toast.success}
          error={this.props.toast.error}
          message={this.props.toast.message}
        />
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
  return { user: state.user, toast: state.toast };
};

const mapDispatch = { checkAuthStatus };

export default connect(mapState, mapDispatch)(App);

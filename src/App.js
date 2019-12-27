import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import Header from "./layout/Header";

function App() {
  const [isAuthorized, setAuth] = useState(false);
  return isAuthorized ? (
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

export default App;

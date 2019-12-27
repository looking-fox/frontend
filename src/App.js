import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Auth from "./views/Auth";
import Header from "./layout/Header";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

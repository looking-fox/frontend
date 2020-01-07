import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewWorkflows from "../components/Workflow/ViewWorkflows";
import NewWorkflow from "../components/Workflow/NewWorkflow";

class Workflows extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/workflows" component={ViewWorkflows} />
          <Route path="/workflows/new" component={NewWorkflow} />
        </Switch>
      </Router>
    );
  }
}

export default Workflows;

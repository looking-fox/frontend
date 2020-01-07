import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewWorkflows from "../components/Workflow/ViewWorkflows";
import NewWorkflow from "../components/Workflow/NewWorkflow";

class Workflows extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/workflows" component={ViewWorkflows} />
        <Route path="/workflows/new" component={NewWorkflow} />
        <Route default path="/workflows" component={ViewWorkflows} />
      </Switch>
    );
  }
}

export default Workflows;

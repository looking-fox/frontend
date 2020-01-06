import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewWorkflows from "../components/Workflow/ViewWorkflows";
import NewWorkflow from "../components/Workflow/NewWorkflow";

const Workflows = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ViewWorkflows} />
        <Route path="/workflows/new" component={NewWorkflow} />
        <Route path="/" default component={ViewWorkflows} />
      </Switch>
    </Router>
  );
};

export default Workflows;

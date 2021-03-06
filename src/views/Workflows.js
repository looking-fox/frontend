import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewWorkflows from "../components/Workflow/ViewWorkflows";
import NewWorkflow from "../components/Workflow/NewWorkflow/NewWorkflow";

const Workflows = () => (
  <Switch>
    <Route exact path="/workflows" component={ViewWorkflows} />
    <Route path="/workflows/new" component={NewWorkflow} />
    <Route path="/workflows/edit/:wfId" component={NewWorkflow} />
    <Route default path="/workflows" component={ViewWorkflows} />
  </Switch>
);

export default Workflows;

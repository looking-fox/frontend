import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewForms from "../components/Forms/ViewForms/ViewForms";

const Forms = () => (
  <Switch>
    <Route exact path="/" component={ViewForms} />
    <Route default path="/" component={ViewForms} />
  </Switch>
);

export default Forms;

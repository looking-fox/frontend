import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewTasks from "../components/Tasks/ViewTasks/ViewTasks";

const Tasks = () => (
  <Switch>
    <Route exact path="/" component={ViewTasks} />
    <Route default path="/" component={ViewTasks} />
  </Switch>
);

export default Tasks;

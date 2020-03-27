import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewClients from "../components/Clients/ViewClients";

class Clients extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ViewClients} />
        <Route default path="/" component={ViewClients} />
      </Switch>
    );
  }
}

export default Clients;

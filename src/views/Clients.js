import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewClients from "../components/Clients/ViewClients";
import AddOrEditClient from "../components/Clients/AddOrEditClient/AddOrEditClient";

class Clients extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ViewClients} />
        <Route exact path="/new" component={AddOrEditClient} />
        <Route exact path="/edit/:clientId" component={AddOrEditClient} />
        <Route default path="/" component={ViewClients} />
      </Switch>
    );
  }
}

export default Clients;

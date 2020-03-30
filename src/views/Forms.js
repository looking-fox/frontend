import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import LoadForms from "../components/Forms/LoadForms/LoadForms";
import ViewForm from "../components/Forms/ViewForm/ViewForm";
import Sidebar from "../components/Forms/Sidebar";

const Forms = () => (
  <ViewContainer>
    <Sidebar />
    <Switch>
      <Route exact path="/" component={LoadForms} />
      <Route path="/forms/:formLink" component={ViewForm} />
      <Route default path="/" component={LoadForms} />
    </Switch>
  </ViewContainer>
);

const ViewContainer = styled.div`
  display: flex;
`;

export default Forms;

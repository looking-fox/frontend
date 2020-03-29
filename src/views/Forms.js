import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import ViewForms from "../components/Forms/ViewForms/ViewForms";
import Sidebar from "../components/Forms/Sidebar";

const Forms = () => (
  <ViewContainer>
    <Sidebar />
    <Switch>
      <Route exact path="/" component={ViewForms} />
      <Route default path="/" component={ViewForms} />
    </Switch>
  </ViewContainer>
);

const ViewContainer = styled.div`
  display: flex;
`;
export default Forms;

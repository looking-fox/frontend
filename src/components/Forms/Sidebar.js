import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Text, Link } from "../../ui/StyledComponents";
import SidebarItem from "./SidebarItem";

const Sidebar = () => (
  <Container>
    <Link to="/forms/">
      <Title>Forms</Title>
    </Link>
    <SidebarItem name="Contact Form" active />
    <SidebarItem name="Location Questionnaire" />
  </Container>
);

const Container = styled.div`
  background: white;
  width: 25vw;
  min-width: 250px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  ${p => p.theme.boxShadow};
`;

const Title = styled(Text)`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 10px;
`;

const mapState = state => {
  return { forms: state.forms.forms };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Sidebar);

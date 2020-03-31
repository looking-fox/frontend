import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { Text, Link } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";

const Sidebar = () => {
  const [isHovered, setHover] = useState(false);
  return (
    <Container
      onMouseEnter={!isHovered ? () => setHover(true) : null}
      onMouseLeave={isHovered ? () => setHover(false) : null}
    >
      <TitleContainer>
        <Link to="/forms/">
          <Title>Forms</Title>
        </Link>
        <AddFormText withIcon showOnHover={isHovered}>
          <IoIosAdd />
          Add Form
        </AddFormText>
      </TitleContainer>
      <SidebarItem name="Contact Form" active />
      <SidebarItem name="Location Questionnaire" />
    </Container>
  );
};

const Container = styled.div`
  background: white;
  width: 20vw;
  min-width: 250px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  ${p => p.theme.sideBoxShadow};
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  padding: 20px 0px;
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

const AddFormText = styled(Text)`
  font-size: 0.8em;
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  padding: 10px;
  transition: all 50ms ease-in-out;
  &:hover {
    background: #f9f9f9;
  }
  opacity: ${p => (p.showOnHover ? 0.5 : 0)};
`;

const Title = styled(Text)`
  font-size: 1.2em;
  font-weight: bold;
`;

const mapState = state => {
  return { forms: state.forms.forms };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Sidebar);

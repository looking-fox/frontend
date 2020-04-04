import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { Text, Link } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";

const Sidebar = ({ forms = [] }) => {
  return (
    <Container>
      <TitleContainer>
        <Link to="/forms/">
          <Title>Forms</Title>
        </Link>
        <AddFormText withIcon>
          <IoIosAdd />
          Add Form
        </AddFormText>
      </TitleContainer>
      {forms.map((form, idx) => (
        <SidebarItem
          key={form.formId || idx}
          name={form.formTitle}
          active={form.formActive}
          link={form.formLink}
        />
      ))}
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
  ${(p) => p.theme.sideBoxShadow};
  box-sizing: border-box;
  overflow-y: auto;
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
  opacity: 0.5;
  &:hover {
    background: #f9f9f9;
  }
`;

const Title = styled(Text)`
  font-size: 1.2em;
  font-weight: bold;
`;

const mapState = (state) => {
  return { forms: state.forms.forms };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Sidebar);

import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { Text, Link } from "../../ui/StyledComponents";
import { IoIosAdd } from "react-icons/io";
import { addNewForm } from "../../thunks/formThunk.js";

const Sidebar = ({ forms = [], addNewForm, currentFormLink = "", history }) => {
  const handleAddForm = async () => {
    await addNewForm();
    history.push(`/forms/${currentFormLink}`);
  };
  return (
    <Container>
      <TitleContainer>
        <Link to="/forms/">
          <Title>Forms</Title>
        </Link>
        <AddFormText withIcon onClick={handleAddForm}>
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
          formIsOpen={form.formLink === currentFormLink}
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
  return {
    forms: state.forms.forms,
    currentFormLink: state.forms.currentFormLink,
  };
};

const mapDispatch = { addNewForm };

export default compose(withRouter, connect(mapState, mapDispatch))(Sidebar);

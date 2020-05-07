import React from "react";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { Button } from "../../../ui/StyledComponents";

const hoverStyles = {
  borderTop: "2px solid #b5b5b5",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  cursor: "move",
};

const AddTaskButton = ({ isActive, cardActive, onClick }) => {
  const styles = isActive && !cardActive ? hoverStyles : {};
  return (
    <Container style={styles}>
      <StyledButton fullWidth onClick={onClick}>
        <IoIosAdd />
        Task
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  transition: all 100ms ease-in-out;
`;

const StyledButton = styled(Button)`
  background: transparent;
  color: #777777;
  font-size: 0.8em;
  text-align: left;
  padding: 10px 0px;
  padding-left: 10px;
  justify-content: flex-start;
  outline: none;
  margin-bottom: 100px;
  &:hover {
    opacity: 0.5;
    background: white;
    color: black;
    box-shadow: none;
  }
`;

export default AddTaskButton;

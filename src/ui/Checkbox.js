import React, { useState, useRef } from "react";
import { Input } from "./StyledComponents";
import styled, { css } from "styled-components";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useClickOffElement } from "../components/Tasks/TaskModal/customHooks";

const Checkbox = (props) => {
  const { taskActionName, taskCompleted, taskActionId } = props.item || {};
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = () => {
    props.handleCheckboxChange(taskActionId, !taskCompleted);
  };

  const handleToggleEdit = () => {
    setEditMode(!editMode);
  };

  const checkBoxRef = useRef();
  useClickOffElement(checkBoxRef, () => setEditMode(false));

  const handleDelete = () => {
    props.handleCheckboxDelete(taskActionId);
  };

  return (
    <Container ref={checkBoxRef}>
      <CheckboxInput
        id={taskActionId}
        type="checkbox"
        checked={taskCompleted}
        onChange={handleUpdate}
        {...props}
      />

      <StyledInput showInput={editMode} />
      {!editMode && <Label htmlFor={taskActionId}>{taskActionName}</Label>}

      <Actions>
        <StyledIcon onClick={handleToggleEdit}>
          <FiEdit />
        </StyledIcon>

        <StyledIcon onClick={handleDelete}>
          <FiTrash2 />
        </StyledIcon>
      </Actions>
    </Container>
  );
};

const CheckboxInput = styled.input`
  background: ${(p) => p.theme.lightGrey};
  border: none;
  width: fit-content;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1.1em;
`;

const Label = styled.label`
  font-family: "Avenir";
  margin-left: 10px;
  font-size: 1em;
  padding-top: 0.2em;
`;

const StyledInput = styled(Input)`
  font-family: "Avenir" !important;
  margin: 0;
  padding-left: 10px;
  width: 100%;
  margin-left: 10px;
  font-size: 0.9em;
  outline: none;
  ${(p) =>
    !p.showInput &&
    css`
      position: absolute;
      top: -1000px;
      left: -1000px;
      visibility: hidden;
    `}
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  &:hover ~ #jaguar {
    display: block;
  }
`;

const Actions = styled.div`
  display: none;
  ${Container}:hover & {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
`;

const StyledIcon = styled.div`
  margin: 0px 5px;
  &:hover {
    opacity: 0.5;
  }
`;

export default Checkbox;

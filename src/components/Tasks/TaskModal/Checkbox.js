import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../../ui/StyledComponents";
import styled, { css } from "styled-components";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useClickOffElement } from "./customHooks";

const Checkbox = (props) => {
  const { taskActionName, taskCompleted, taskActionId, createdAt } =
    props.item || {};
  const { isLastItem } = props;
  const [editMode, setEditMode] = useState(false);

  const checkBoxRef = useRef();
  useClickOffElement(checkBoxRef, () => setEditMode(false));
  const inputRef = useRef();

  useEffect(() => {
    if (!createdAt && isLastItem && !editMode) {
      setEditMode(true);
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 0);
    }
  }, []);

  const handleUpdateCheckbox = ({ target: t }) => {
    const value = t.name === "taskCompleted" ? t.checked : t.value;
    props.handleCheckboxChange(taskActionId, t.name, value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleToggleEdit();
  };

  const handleToggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    props.handleCheckboxDelete(taskActionId);
  };

  return (
    <Container ref={checkBoxRef}>
      <CheckboxInput
        id={taskActionId}
        type="checkbox"
        name="taskCompleted"
        checked={taskCompleted}
        onChange={handleUpdateCheckbox}
        {...props}
      />

      <StyledInput
        name="taskActionName"
        ref={inputRef}
        value={taskActionName}
        showInput={editMode}
        onChange={handleUpdateCheckbox}
        onKeyDown={handleKeyDown}
      />
      {!editMode && (
        <Label htmlFor={taskActionId}>{taskActionName || "Task"}</Label>
      )}

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
  background: ${(p) => p.theme.colors.lightGrey};
  border: none;
  width: fit-content;
  box-sizing: border-box;
  padding: 10px 10px;
  margin: 10px 0px;
  font-size: 1.1em;
`;

const Label = styled.label`
  font-family: "Avenir";
  margin-left: 15px;
  font-size: 1em;
  padding-top: 0.2em;
`;

const StyledInput = styled(Input)`
  font-family: "Avenir" !important;
  margin: 0;
  padding: 5px 0px;
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

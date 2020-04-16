import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { IoMdClose } from "react-icons/io";
import { FiList } from "react-icons/fi";
import { Text, Input } from "../../../ui/StyledComponents";
import { useClickOffElement } from "./customHooks";

const TaskHeader = ({ taskTitle, handleUpdate, onClose }) => {
  const customRef = useRef();
  const [editMode, setEditMode] = useState(false);

  useClickOffElement(customRef, editMode, () => {
    if (editMode) setEditMode(false);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  return (
    <HeaderContainer ref={customRef}>
      <StyledContainer showContainer={editMode}>
        <StyledIcon />
        <StyledInput
          value={taskTitle}
          name="taskTitle"
          placeholder="Task"
          onChange={handleUpdate}
        />
      </StyledContainer>

      {!editMode && (
        <StyledText onClick={handleClick}>
          <FiList />
          {taskTitle || "Task"}
        </StyledText>
      )}

      <CloseIcon onClick={onClose} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background: ${(p) => p.theme.lightGrey};
  width: 45vw;
  display: flex;
  align-items: center;
  padding: 20px 25px;
  padding-top: 25px;
  margin-bottom: 20px;
  box-sizing: border-box;
  height: 60px;
`;

const StyledText = styled(Text)`
  font-size: 1.3em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  & svg {
    margin-right: 10px;
  }
`;

const StyledInput = styled(Input)`
  font-size: 1.3em;
  font-weight: bold;
  outline: none;
  margin: 0;
  padding: 0;
  margin-left: 10px;
  width: 100%;
  border-bottom: 1px solid #b8b8b8;
  & svg {
    margin-right: 10px;
  }
`;

const StyledIcon = styled(FiList)`
  font-size: 1.4em;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 50px;

  ${(p) =>
    !p.showContainer &&
    css`
      position: absolute;
      top: -1000px;
      left: -1000px;
      visibility: hidden;
    `}
`;

const CloseIcon = styled(IoMdClose)`
  margin-left: auto;
  cursor: pointer;
  font-size: 1.5em;
`;

export default React.memo(TaskHeader);

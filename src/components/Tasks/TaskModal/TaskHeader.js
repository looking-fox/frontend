import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { FiList } from "react-icons/fi";
import { Text, Input } from "../../../ui/StyledComponents";
import { useClickOffElement } from "./customHooks";

const TaskHeader = ({ taskTitle, handleUpdate, onClose }) => {
  const customRef = useRef();
  const [editMode, setEditMode] = useState(false);
  useClickOffElement(customRef, editMode, () => setEditMode(false));

  const handleClick = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  return (
    <HeaderContainer onClick={handleClick} ref={customRef}>
      {editMode ? (
        <>
          <FiList /> <Input value={taskTitle} onChange={handleUpdate} />
        </>
      ) : (
        <StyledText>
          <FiList />
          {taskTitle}
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

const CloseIcon = styled(IoMdClose)`
  margin-left: auto;
  cursor: pointer;
  font-size: 1.5em;
`;

export default TaskHeader;
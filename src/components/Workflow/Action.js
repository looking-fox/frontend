import React, { useRef } from "react";
import styled from "styled-components";
import { Text, Input } from "../../ui/StyledComponents";
import { IoIosCheckboxOutline, IoMdTrash } from "react-icons/io";

const Action = ({
  idx,
  stepNumber,
  text,
  isInEditMode,
  handleToggleActionMode,
  handleSaveActionName,
  handleDeleteAction
}) => {
  const textRef = useRef(null);
  const emptyInput = text.length === 0;
  const showInputBox = emptyInput || isInEditMode;

  const toggleAction = async () => {
    await handleToggleActionMode(idx);
    textRef.current && textRef.current.focus();
  };

  return (
    <ActionContainer onClick={toggleAction}>
      <StepText>Step {stepNumber}</StepText>
      <IoIosCheckboxOutline />
      {showInputBox ? (
        <ActionInput
          placeholder="New Action"
          ref={textRef}
          value={text}
          onChange={e => handleSaveActionName(e, idx)}
          onBlur={() => handleToggleActionMode(idx)}
        />
      ) : (
        <ActionText>{text}</ActionText>
      )}
      <TrashIcon onClick={() => handleDeleteAction(idx)} />
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  background: white;
  border-radius: 3px;
  width: 70%;
  padding: 1em 1em;
  margin: 1em 0em;
  ${p => p.theme.sideBoxShadow};
  position: relative;
  display: flex;
  align-items: center;
  transition: all 500ms ease-in-out;
  & svg {
    margin-right: 5px;
    font-size: 1.1em;
  }
`;

const StepText = styled(Text)`
  position: absolute;
  left: -75px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #777777;
`;

const ActionInput = styled(Input)`
  background: transparent;
  outline: none;
  border-bottom: 1px solid #ebebeb;
  width: 90%;
  font-size: 0.9em;
`;

const ActionText = styled(Text)`
  cursor: edit;
`;

const TrashIcon = styled(IoMdTrash)`
  color: #777777;
  margin-left: auto;
  cursor: pointer;
`;

export default Action;

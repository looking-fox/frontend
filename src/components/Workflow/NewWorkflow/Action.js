import React, { useRef } from "react";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";
import { IoIosCheckboxOutline, IoMdTrash } from "react-icons/io";
import DragIcon from "../../../assets/images/drag-indicator.svg";

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
      <IconImage src={DragIcon} />
      <IoIosCheckboxOutline />
      {showInputBox ? (
        <ActionInput
          placeholder="New Action"
          ref={textRef}
          value={text}
          onChange={e => handleSaveActionName(e, idx)}
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
  width: 80%;
  padding: 1em 1em;
  margin: 1em auto;
  ${p => p.theme.sideBoxShadow};
  position: relative;
  display: flex;
  align-items: center;
  cursor: text;
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
  width: 80%;
  font-size: 0.9em;
`;

const ActionText = styled(Text)`
  cursor: edit;
`;

const IconImage = styled.img`
  padding-right: 10px;
  opacity: 0.2;
  cursor: move;
`;

const TrashIcon = styled(IoMdTrash)`
  color: #777777;
  margin-left: auto;
  cursor: pointer;
`;

export default Action;

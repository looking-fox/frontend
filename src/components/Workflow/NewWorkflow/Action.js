import React, { useRef } from "react";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";
import { IoIosCheckboxOutline, IoMdTrash } from "react-icons/io";
import DragIcon from "../../../assets/images/drag-indicator.svg";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const Action = ({
  idx,
  stepNumber,
  text,
  isInEditMode,
  handleToggleActionMode,
  handleSaveActionName,
  handleDeleteAction,
  moveAction
}) => {
  const textRef = useRef(null);
  const emptyInput = text.length === 0;
  const showInputBox = emptyInput || isInEditMode;

  const toggleAction = async () => {
    await handleToggleActionMode(idx);
    textRef.current && textRef.current.focus();
  };

  //--React DND Logic--//
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.idx;
      const hoverIndex = idx;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveAction(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.idx = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, idx },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  //--React DND Logic--//

  return (
    <ActionContainer onClick={toggleAction} ref={ref} style={{ opacity }}>
      {!isDragging && <StepText>Step {stepNumber}</StepText>}
      <IconImage src={DragIcon} />
      <IoIosCheckboxOutline />
      {showInputBox && !isDragging ? (
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

import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";
import { toggleModal } from "../../../reducers/taskSlice";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const hoverStyles = {
  borderTop: "2px solid #b5b5b5",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  cursor: "move",
};

const TaskCard = ({ task, index, handleUpdateTask, toggleModal }) => {
  const cardRef = useRef(null);
  const [input, setInput] = useState("");

  const handleOnChange = (e) => setInput(e.target.value);

  const handleOnClick = () => {
    if (task.isNew) return;
    else toggleModal({ task });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveCard();
  };

  const handleSaveCard = () => {
    if (input) {
      const updatedTask = JSON.parse(JSON.stringify(task));
      updatedTask.taskTitle = input;
      delete updatedTask["isNew"];
      const { taskId } = updatedTask;
      handleUpdateTask(taskId, updatedTask);
    }
  };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = cardRef.current.getBoundingClientRect();
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
      // moveCard(dragIndex, hoverIndex);
      // item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, index, title: task.taskTitle },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(cardRef));
  const isActive = isOver && canDrop;

  return (
    <CardContainer
      ref={cardRef}
      style={isActive ? { ...hoverStyles } : {}}
      onClick={handleOnClick}
    >
      {task.isNew ? (
        <StyledInput
          placeholder="New"
          value={input}
          autoFocus={true}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveCard}
        />
      ) : (
        <StyledText>{task.taskTitle ? task.taskTitle : "Undefined"}</StyledText>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background: white;
  max-height: 100px;
  border-radius: 3px;
  ${(p) => p.theme.sideBoxShadow};
  margin: 15px 0px;
  padding: 10px;
  cursor: pointer;
  transition: all 100ms ease-in-out;
`;

const StyledInput = styled(Input)`
  background: transparent;
  outline: none;
  margin: 0;
  font-size: 0.9em;
`;

const StyledText = styled(Text)`
  padding: 10px 0px;
  padding-left: 10px;
`;

const mapDispatch = { toggleModal };

export default connect(null, mapDispatch)(TaskCard);

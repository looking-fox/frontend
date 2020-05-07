import React, { useState, useRef, useEffect } from "react";
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

const TaskCard = ({
  task,
  index,
  columnIndex,
  columnId,
  handleDrop,
  handleUpdateTask,
  handleCardHover,
  toggleModal,
}) => {
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
    drop: (item) =>
      handleDrop({
        newIndex: index,
        newColumnIndex: columnIndex,
        newColumnId: columnId,
        item,
      }),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const [, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      prevIndex: index,
      taskId: task.taskId,
      title: task.taskTitle,
      prevColumnIndex: columnIndex,
      task,
    },
  });

  const isActive = isOver && canDrop;
  useEffect(() => {
    handleCardHover(isActive);
  }, [isActive]);

  drag(drop(cardRef));
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

import React, { useState } from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import AddTaskButton from "./AddTaskButton";

const TaskColumn = ({
  column,
  columnIndex,
  handleDrop,
  handleAddTask,
  handleUpdateTask,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const noTasks = column.tasks.length === 0;

  const handleOnClick = () => {
    const location = {
      taskColumnId: column.taskColumnId,
      taskRowIndex: column.tasks.length,
    };
    handleAddTask(location);
  };

  const handleCardHover = (cardHoverStatus) => {
    if (cardHoverStatus !== cardHover) setCardHover(cardHoverStatus);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      if (noTasks) {
        handleDrop({
          newColumnIndex: columnIndex,
          newIndex: 0,
          newColumnId: column.taskColumnId,
          item,
        });
      } else return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let opacity = isActive || !canDrop ? 1 : 0.5;

  return (
    <ColumnContainer ref={drop} style={{ opacity }}>
      <Title>{column.taskColumnName}</Title>
      {column.tasks.map((task, idx) => {
        return (
          <div key={task.taskId || idx}>
            <TaskCard
              task={task}
              index={idx}
              columnIndex={columnIndex}
              columnId={column.taskColumnId}
              handleDrop={handleDrop}
              handleUpdateTask={handleUpdateTask}
              handleCardHover={handleCardHover}
            />
          </div>
        );
      })}
      <AddTaskButton
        isActive={isActive}
        cardActive={cardHover}
        onClick={handleOnClick}
        handleDrop={handleDrop}
      />
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex: 1;
  margin: 0px 15px;
  padding: 25px 0px;
  padding-top: 50px;
`;

const Title = styled(Text)`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 25px;
`;

export default TaskColumn;

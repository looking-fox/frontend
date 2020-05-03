import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../../ui/StyledComponents";
import TaskCard from "./TaskCard";
import { IoIosAdd } from "react-icons/io";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";

const AddTaskButton = ({ onClick }) => {
  return (
    <StyledButton fullWidth onClick={onClick}>
      <IoIosAdd />
      Task
    </StyledButton>
  );
};

const TaskColumn = ({
  column,
  handleAddTask,
  handleUpdateTask,
  accept,
  onDrop,
}) => {
  const noTasks = column.tasks.length === 0;

  const handleOnClick = () => {
    const location = {
      taskColumnId: column.taskColumnId,
      taskRowIndex: column.tasks.length,
    };
    handleAddTask(location);
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
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
        const displayAddButton = idx === column.tasks.length - 1;
        return (
          <div key={task.taskId || idx}>
            <TaskCard
              task={task}
              type={ItemTypes.CARD}
              handleUpdateTask={handleUpdateTask}
            />
            {displayAddButton && <AddTaskButton onClick={handleOnClick} />}
          </div>
        );
      })}
      {noTasks && <AddTaskButton onClick={handleOnClick} />}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  flex: 1;
  margin: 0px 15px;
  padding: 25px 0px;
  padding-top: 50px;
  transition: all 100ms ease-in-out;
`;

const Title = styled(Text)`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 25px;
`;

const StyledButton = styled(Button)`
  background: transparent;
  color: #777777;
  font-size: 0.8em;
  text-align: left;
  padding: 10px 0px;
  padding-left: 10px;
  justify-content: flex-start;
  outline: none;
  margin-bottom: 100px;
  &:hover {
    opacity: 0.5;
    background: white;
    color: black;
    box-shadow: none;
  }
`;

export default TaskColumn;

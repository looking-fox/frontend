import React from "react";
import styled from "styled-components";
import { Text, Button } from "../../../ui/StyledComponents";
import TaskCard from "./TaskCard";
import { IoIosAdd } from "react-icons/io";

const AddTaskButton = () => {
  return (
    <StyledButton fullWidth>
      <IoIosAdd />
      Task
    </StyledButton>
  );
};

const TaskColumn = ({ column }) => {
  const noTasks = column.tasks.length === 0;
  return (
    <ColumnContainer>
      <Title>{column.taskColumnName}</Title>
      {column.tasks.map((task, idx) => {
        const displayAddButton = idx === column.tasks.length - 1;
        return (
          <>
            <TaskCard task={task} key={task.taskId || idx} />
            {displayAddButton && <AddTaskButton />}
          </>
        );
      })}
      {noTasks && <AddTaskButton />}
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

const StyledButton = styled(Button)`
  background: transparent;
  color: #777777;
  font-size: 0.8em;
  text-align: left;
  padding: 10px 0px;
  padding-left: 10px;
  justify-content: flex-start;
  &:hover {
    opacity: 0.5;
    background: white;
    color: black;
    box-shadow: none;
  }
`;

export default TaskColumn;

import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title = "Column" }) => {
  const mockData = [
    {
      taskTitle: "Cull Photos",
      taskPriority: "low",
      taskDueDate: new Date(),
      taskNotes: "",
      taskActions: [
        { taskActionId: 405, taskAcionText: "Minor Task", completed: false },
      ],
      clientId: 234,
      clientName: "Jordan Riley",
      taskId: Math.floor(Math.random() * 500),
    },
    {
      taskTitle: "Deliver Photos",
      client: "Scott Mincer",
      taskId: Math.floor(Math.random() * 500),
    },
  ];

  return (
    <ColumnContainer>
      <Title>{title}</Title>
      {mockData.map((task, idx) => {
        return <TaskCard task={task} key={task.taskId || idx} />;
      })}
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

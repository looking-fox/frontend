import React, { useState } from "react";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";

const TaskCard = ({ task, handleUpdateTask }) => {
  // TO DO: use context API
  const [input, setInput] = useState("");
  const handleOnChange = (e) => setInput(e.target.value);
  const handleOnBlur = () => {
    if (input) {
      const updatedTask = JSON.parse(JSON.stringify(task));
      updatedTask.taskTitle = input;
      delete updatedTask["isNew"];
      const { taskId } = updatedTask;
      handleUpdateTask(taskId, updatedTask);
    }
  };
  return (
    <CardContainer>
      {task.isNew ? (
        <StyledInput
          placeholder="New"
          value={input}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
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

export default TaskCard;

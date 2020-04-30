import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";
import { toggleModal } from "../../../reducers/taskSlice";

const TaskCard = ({ task, handleUpdateTask, toggleModal }) => {
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

  const handleOnClick = () => {
    if (task.isNew) return;
    else toggleModal({ task });
  };

  return (
    <CardContainer onClick={handleOnClick}>
      {task.isNew ? (
        <StyledInput
          placeholder="New"
          value={input}
          autoFocus={true}
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

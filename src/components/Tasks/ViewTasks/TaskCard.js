import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Text, Input } from "../../../ui/StyledComponents";
import { toggleModal } from "../../../reducers/taskSlice";
import { useDrag } from "react-dnd";

const TaskCard = ({ task, handleUpdateTask, toggleModal, type }) => {
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

  const [{ opacity }, drag] = useDrag({
    item: { taskId: task.taskId, type, currentColumnId: task.taskColumnId },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <CardContainer ref={drag} style={{ opacity }} onClick={handleOnClick}>
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

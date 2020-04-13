import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";

const TaskCard = ({ task }) => {
  return (
    <CardContainer>
      <Text>{task.taskTitle}</Text>
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

export default TaskCard;

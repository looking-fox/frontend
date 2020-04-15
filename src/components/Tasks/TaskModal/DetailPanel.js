import React from "react";
import styled from "styled-components";
import { Text } from "../../../ui/StyledComponents";

const DetailPanel = ({ taskPriority, taskDueDate }) => {
  // TO DO: Still need to query for client info to pass in
  return (
    <InnerPanel>
      <DetailText>
        <span>Priority:</span> <Bubble>Low</Bubble>
      </DetailText>
      <DetailText>
        <span>Due Date:</span> March 28th, 2020
      </DetailText>
      <DetailText>
        <span>Client:</span> Jessica & John
      </DetailText>
    </InnerPanel>
  );
};

const InnerPanel = styled.div`
  height: fit-content;
  padding: 0px 10px;
`;

const DetailText = styled(Text)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  & span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const Bubble = styled.span`
  background: ${(p) => p.theme.red};
  color: white;
  padding: 2px 5px;
  font-weight: bold;
  border-radius: 3px;
  margin-left: 5px;
  height: fit-content;
`;

export default DetailPanel;

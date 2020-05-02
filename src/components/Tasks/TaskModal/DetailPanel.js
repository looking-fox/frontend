import React from "react";
import styled from "styled-components";
import { Text, Calendar } from "../../../ui/StyledComponents";
import PriorityMenu from "./PriorityMenu";

const DetailPanel = ({ taskPriority, taskDueDate, handleDetailPanel }) => {
  // TO DO: Still need to query for client info to pass in
  const handleDateChange = (date) => {
    handleDetailPanel("taskDueDate", date);
  };

  return (
    <InnerPanel>
      <DetailBox>
        <DetailTitle>Priority:</DetailTitle>
        <PriorityMenu taskPriority={taskPriority} />
      </DetailBox>

      <DetailBox>
        <DetailTitle>Due Date:</DetailTitle>
        <Calendar value={taskDueDate} handleOnChange={handleDateChange} />
      </DetailBox>

      <DetailBox>
        <DetailTitle>Client:</DetailTitle>
        <DetailInfo>Jessica & John</DetailInfo>
      </DetailBox>
    </InnerPanel>
  );
};

const InnerPanel = styled.div`
  height: fit-content;
  padding: 0px 10px;
`;

const DetailBox = styled.div`
  margin-bottom: 35px;
`;

const DetailTitle = styled(Text)`
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 5px;
`;

const DetailInfo = styled(Text)`
  font-size: 0.9em;
  padding-left: 5px;
`;

export default DetailPanel;

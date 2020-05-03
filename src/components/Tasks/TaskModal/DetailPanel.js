import React from "react";
import styled from "styled-components";
import { Text, Calendar } from "../../../ui/StyledComponents";
import PriorityMenu from "./PriorityMenu";
import ClientMenu from "./ClientMenu";

const DetailPanel = ({
  taskPriority,
  taskDueDate,
  clientForTask,
  handleFormChange,
  handleClientChange,
}) => {
  const handleDateChange = (date) => {
    handleFormChange("taskDueDate", date);
  };

  const handlePriorityChange = (taskPriority) => {
    handleFormChange("taskPriority", taskPriority);
  };

  return (
    <InnerPanel>
      <DetailBox>
        <DetailTitle>Priority:</DetailTitle>
        <PriorityMenu
          taskPriority={taskPriority}
          handlePriorityChange={handlePriorityChange}
        />
      </DetailBox>

      <DetailBox>
        <DetailTitle>Due Date:</DetailTitle>
        <Calendar
          value={taskDueDate}
          defaultText="No Due Date"
          handleOnChange={handleDateChange}
        />
      </DetailBox>

      <DetailBox>
        <DetailTitle>Client:</DetailTitle>
        <ClientMenu
          clientForTask={clientForTask}
          handleClientChange={handleClientChange}
        />
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

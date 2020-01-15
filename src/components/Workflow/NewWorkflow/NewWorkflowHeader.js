import React from "react";
import styled from "styled-components";
import { Button, Text } from "../../../ui/StyledComponents";

const NewWorkflowHeader = ({
  wfTagColor,
  newWorkflow,
  handleAddOrUpdateWorkflow
}) => {
  const titleText = newWorkflow ? "Your New Workflow" : "Your Workflow";
  const actionText = newWorkflow ? "Save" : "Update";
  return (
    <HeaderSection>
      <HeaderTitle>{titleText}</HeaderTitle>
      <SaveButton
        backgroundColor={wfTagColor}
        onClick={handleAddOrUpdateWorkflow}
      >
        {actionText} Workflow
      </SaveButton>
    </HeaderSection>
  );
};

const HeaderSection = styled.div`
  background: white;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #ebebeb;
`;

const HeaderTitle = styled(Text)`
  font-size: 1.5em;
  font-weight: bold;
  padding-left: 50px;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
  margin-right: 50px;
`;

export default NewWorkflowHeader;

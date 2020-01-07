import React from "react";
import styled from "styled-components";
import { Button, Text } from "../../../ui/StyledComponents";

const NewWorkflowHeader = ({ wfTagColor, handleAddWorkflow }) => {
  return (
    <HeaderSection>
      <HeaderTitle>Your New Workflow</HeaderTitle>
      <SaveButton backgroundColor={wfTagColor} onClick={handleAddWorkflow}>
        Save Workflow
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

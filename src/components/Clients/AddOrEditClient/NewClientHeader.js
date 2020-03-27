import React from "react";
import styled from "styled-components";
import { Button, Text } from "../../../ui/StyledComponents";

const NewClientHeader = ({
  newClient,
  disabled,
  formState,
  handleAddOrUpdateClient
}) => {
  const titleText = formState.name || "New Client";
  const actionText = newClient ? "Save" : "Update";

  return (
    <HeaderSection>
      <HeaderTitle>{titleText}</HeaderTitle>
      <SaveButton
        type="submit"
        disabled={disabled}
        onClick={handleAddOrUpdateClient}
      >
        {actionText} Client
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

export default NewClientHeader;

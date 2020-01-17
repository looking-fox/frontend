import React from "react";
import styled from "styled-components";
import { Text } from "../../ui/StyledComponents";

const Client = ({ client }) => {
  console.log("Inner Client: ", client);
  return (
    <Container>
      <ClientName>{client.clientFullName}</ClientName>
      <WorkflowBubble bubbleColor={client.wfTagColor}>
        {client.wfName}
      </WorkflowBubble>
    </Container>
  );
};

export default Client;

const Container = styled.div`
  background: white;
  margin: 25px 0px;
  padding: 1em;
  border-radius: 3px;
  ${p => p.theme.sideBoxShadow};
  display: flex;
  align-items: center;
`;

const ClientName = styled(Text)`
  margin: 0px 10px;
`;

const WorkflowBubble = styled(Text)`
  width: fit-content;
  background: ${p => p.bubbleColor};
  color: white;
  font-weight: bold;
  margin: 0px 10px;
  padding: 3px 5px;
  border-radius: 3px;
`;

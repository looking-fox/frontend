import React from "react";
import { Text, Button } from "../../ui/StyledComponents";
import styled from "styled-components";

const NewWorkflow = () => {
  return (
    <Container>
      <Text>New Workflow</Text>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

export default NewWorkflow;

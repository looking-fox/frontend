import React from "react";
import styled from "styled-components";
import { Text } from "../../ui/StyledComponents";

const ClientTableTitles = () => {
  return (
    <Container>
      <Title>Name</Title>
      <Title>Session</Title>
      <Title>Date</Title>
      <Title>Location</Title>
      <Title>Current Step</Title>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: repeat(5, 1fr);
  padding: 0em 1em;
  margin-bottom: -10px;
`;

const Title = styled(Text)`
  font-size: 0.7em;
  color: ${(p) => p.theme.colors.darkGrey};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0px 25px;
`;

export default ClientTableTitles;

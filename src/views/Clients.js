import React from "react";
import styled from "styled-components";

const Clients = () => {
  return (
    <Container>
      <p style={{ textAlign: "center", marginTop: 50 }}>Clients</p>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

export default Clients;

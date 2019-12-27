import React from "react";
import styled from "styled-components";

const Auth = () => {
  return (
    <Container>
      <AuthContainer>
        <Title>
          <span role="img" aria-label="hand waving">
            👋
          </span>{" "}
          Hey, welcome back!
        </Title>
      </AuthContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  ${p => p.theme.flexAllCenter}
`;

const AuthContainer = styled.div`
  width: 25vw;
  height: 60vh;
  min-width: 300px;
  background: white;
  ${p => p.theme.boxShadow}
  padding: 50px 10px;
`;

const Title = styled.p`
  font-size: 1.5em;
  font-family: "Avenir";
  font-weight: bold;
  text-align: center;
`;

export default Auth;

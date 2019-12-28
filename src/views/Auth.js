import React from "react";
import styled from "styled-components";
import SignInForm from "../components/Auth/SignInForm";

const Auth = props => {
  return (
    <Container>
      <SignInForm setAuth={props.setAuth} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.lightGrey};
  ${p => p.theme.flexAllCenter}
`;

export default Auth;

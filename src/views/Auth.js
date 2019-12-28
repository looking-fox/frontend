import React from "react";
import styled from "styled-components";
import { firebaseAuth, facebookProvider } from "../auth/firebaseAuth";
import { Input, Button, Text } from "../ui/StyledComponents";
import Logo from "../assets/images/logo.png";
import { IoLogoFacebook } from "react-icons/io";

const Auth = () => {
  const createNewUser = async () => {
    try {
      const { user } = await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword("brockhoffrw@gmail.com", "tester!2323");
      console.log("New User: ", user);
    } catch (err) {
      console.log("Sign Up Error: ", err);
    }
  };

  const logInWithFacebook = async () => {
    try {
      const { user } = await firebaseAuth
        .auth()
        .signInWithPopup(facebookProvider);
      console.log("New Facebook User: ", user);
    } catch (err) {
      console.log("Sign Up Error: ", err);
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Image src={Logo} alt="logo" />
        <Title onClick={logInWithFacebook}>
          <span role="img" aria-label="hand waving">
            👋
          </span>{" "}
          Hey, welcome back!
        </Title>
        <Input placeholder="Email" type="email" />
        <Input
          placeholder="Password"
          type="password"
          style={{ marginBottom: 10 }}
        />
        <Button fullWidth>Sign In</Button>
        <Button fullWidth style={{ background: "#3b5998" }}>
          <IoLogoFacebook /> Facebook
        </Button>
        <SignUpLink>Need to Sign Up?</SignUpLink>
      </AuthContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.lightGrey};
  ${p => p.theme.flexAllCenter}
`;

const AuthContainer = styled.div`
  width: 25vw;
  height: fit-content;
  min-width: 300px;
  background: white;
  ${p => p.theme.boxShadow}
  padding: 10px 25px;
  border-radius: 3px;
`;

const Title = styled.p`
  font-size: 1.5em;
  font-family: "Avenir";
  font-weight: bold;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 50px;
`;

const Image = styled.img`
  height: 40px;
  display: block;
  margin: 10px auto;
  margin-top: 25px;
`;

const SignUpLink = styled(Text)`
  text-align: right;
  margin-top: 25px;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default Auth;

import React, { Component } from "react";
import { firebaseAuth, facebookProvider } from "../../auth/firebaseAuth";
import styled from "styled-components";
import { Input, Button, Text } from "../../ui/StyledComponents";
import Logo from "../../assets/images/logo.png";
import { IoLogoFacebook } from "react-icons/io";
import { withRouter, Link } from "react-router-dom";

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
    isLoggingIn: false,
    isLoggingInWithFacebook: false
  };

  signUp = async () => {
    try {
      this.setState({ isLoggingIn: true });
      const { email, password, confirmPassword } = this.state;
      const { user } = await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("New User: ", user);
      this.setState({ isLoggingIn: false });
    } catch (err) {
      this.handleError(err.message);
      this.setState({ isLoggingIn: false });
    }
  };

  signIn = async () => {
    this.setState({ isLoggingIn: true });
    try {
      const { email, password } = this.state;
      const { user } = await firebaseAuth
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("New User: ", user);
      this.setState({ isLoggingIn: false }, () => this.props.setAuth(true));
    } catch (err) {
      this.handleError(err.message);
      this.setState({ isLoggingIn: false });
    }
  };

  signInWithFacebook = async () => {
    this.setState({ isLoggingInWithFacebook: true });
    try {
      const { user } = await firebaseAuth
        .auth()
        .signInWithPopup(facebookProvider);
      console.log("New Facebook User: ", user);
      this.setState({ isLoggingInWithFacebook: false });
    } catch (err) {
      this.handleError(err.message);
      this.setState({ isLoggingInWithFacebook: false });
    }
  };

  handleError = (errorMessage = "Oops. Something went wrong.") => {
    this.setState({ error: true, errorMessage });
  };

  handleSignUpStatus() {
    const { pathname } = this.props.location;
    return pathname === "/signup";
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.signIn();
    }
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    const isSignUpForm = this.handleSignUpStatus();
    return (
      <AuthContainer>
        <Image src={Logo} alt="logo" />
        <Title>
          <span role="img" aria-label="hand waving">
            👋
          </span>{" "}
          Hey, welcome back!
        </Title>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          name="email"
          onChange={this.handleInput}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          style={{ marginBottom: 10 }}
          name="password"
          onChange={this.handleInput}
          onKeyPress={this.handleKeyPress}
        />
        {isSignUpForm && (
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            style={{ marginBottom: 10 }}
            name="confirmPassword"
            onChange={this.handleInput}
          />
        )}

        {this.state.error && (
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        )}

        <Button
          fullWidth
          onClick={isSignUpForm ? this.signUp : this.signIn}
          isLoading={this.state.isLoggingIn}
        >
          {isSignUpForm ? "Sign Up" : "Log In"}
        </Button>
        <Button
          fullWidth
          isLoading={this.state.isLoggingInWithFacebook}
          style={{ background: "#3b5998" }}
          onClick={this.signInWithFacebook}
        >
          <IoLogoFacebook /> {isSignUpForm ? "Sign Up" : "Log In"} with Facebook
        </Button>
        <StyledLink to={isSignUpForm ? "/" : "/signup"}>
          <SignUpLink>
            {isSignUpForm ? "Need to Sign In?" : "Need to Sign Up?"}
          </SignUpLink>
        </StyledLink>
      </AuthContainer>
    );
  }
}

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

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;

const ErrorMessage = styled(Text)`
  color: #e65f5c;
  text-align: center;
  font-weight: bold;
  line-height: 150%;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export default withRouter(SignInForm);

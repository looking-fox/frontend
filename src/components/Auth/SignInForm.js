import React, { Component } from "react";
import { firebaseAuth, facebookProvider } from "../../auth/firebaseAuth";
import styled from "styled-components";
import { Input, Button, Text } from "../../ui/StyledComponents";
import Logo from "../../assets/images/logo.png";
import { IoLogoFacebook } from "react-icons/io";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { login, signUp } from "../../thunks/userThunks";
import { isValidEmail } from "../../utils/utils";

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: "",
    isLoggingIn: false,
    isLoggingInWithFacebook: false,
  };

  signUp = async () => {
    try {
      this.setState({ isLoggingIn: true });
      const { email: inputEmail, password, confirmPassword } = this.state;
      // Check Email
      if (!isValidEmail(inputEmail)) {
        throw new Error("Email is invalid. Please try again.");
      }
      // Check Passwords
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Please try again.");
      }
      // Fetch New User Data from Firebase
      const { user } = await firebaseAuth
        .auth()
        .createUserWithEmailAndPassword(inputEmail, password);
      const { uid, displayName, photoURL, email } = user;
      // API Request to Create New User
      await this.props.signUp({ uid, displayName, photoURL, email });
    } catch (err) {
      this.handleError(err.message);
    }
  };

  signIn = async () => {
    this.setState({ isLoggingIn: true });
    try {
      const { email, password } = this.state;
      const { user } = await firebaseAuth
        .auth()
        .signInWithEmailAndPassword(email, password);
      await this.props.login(user.uid);
    } catch (err) {
      this.handleError(err.message);
    }
  };

  signInWithFacebook = async () => {
    this.setState({ isLoggingInWithFacebook: true });
    try {
      const { user } = await firebaseAuth
        .auth()
        .signInWithPopup(facebookProvider);
      const { uid, displayName, photoURL, email } = user;
      await this.props.signUp({ uid, displayName, photoURL, email });
    } catch (err) {
      this.handleError(err.message);
    }
  };

  handleError = (errorMessage = "Oops. Something went wrong.") => {
    this.setState({
      error: true,
      errorMessage,
      isLoggingIn: false,
      isLoggingInWithFacebook: false,
    });
  };

  handleSignUpStatus() {
    const { pathname } = this.props.location;
    return pathname === "/signup";
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const isSignUpForm = this.handleSignUpStatus();
      isSignUpForm ? this.signUp() : this.signIn();
    }
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    const isSignUpForm = this.handleSignUpStatus();

    return (
      <Container>
        <AuthContainer>
          <Image src={Logo} alt="logo" />
          <Title>Hey, welcome back!</Title>
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
              onKeyPress={this.handleKeyPress}
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
            <IoLogoFacebook /> {isSignUpForm ? "Sign Up" : "Log In"} with
            Facebook
          </Button>
          <LinkContainer>
            <StyledLink to={isSignUpForm ? "/" : "/signup"}>
              <SignUpLink>
                {isSignUpForm ? "Need to Sign In?" : "Need to Sign Up?"}
              </SignUpLink>
            </StyledLink>
            <StyledLink to={"/password-reset"}>
              <SignUpLink>Forgot Password?</SignUpLink>
            </StyledLink>
          </LinkContainer>
        </AuthContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 100vh;
  background: ${(p) => p.theme.colors.lightGrey};
  ${(p) => p.theme.flexAllCenter}
`;

const AuthContainer = styled.div`
  width: 25vw;
  height: fit-content;
  min-width: 300px;
  background: white;
  ${(p) => p.theme.boxShadow}
  padding: 25px;
  padding-bottom: 10px;
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

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:link,
  &:visited {
    color: inherit;
  }
`;

const ErrorMessage = styled(Text)`
  color: ${(p) => p.theme.colors.red};
  text-align: center;
  font-weight: bold;
  line-height: 150%;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const mapDispatch = { login, signUp };

export default compose(withRouter, connect(null, mapDispatch))(SignInForm);

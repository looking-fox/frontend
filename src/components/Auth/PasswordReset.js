import React, { Component } from "react";
import styled from "styled-components";
import { Input, Button, Text } from "../../ui/StyledComponents";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../auth/firebaseAuth";

class PasswordReset extends Component {
  state = {
    resetEmail: "",
    pending: false,
    error: false,
    errorMessage: "",
    success: false
  };

  handleForgotPassword = async () => {
    try {
      this.setState({ pending: true });
      await firebaseAuth.auth().sendPasswordResetEmail(this.state.resetEmail);
      this.setState({ pending: false, success: true, resetEmail: "" });
    } catch (err) {
      this.handleError(err.message);
    }
  };

  handleSuccess = () => {
    this.setState({
      resetEmail: "",
      success: true,
      error: false,
      errorMessage: ""
    });
  };

  handleError = (errorMessage = "Oops. Something went wrong.") => {
    this.setState({
      error: true,
      errorMessage,
      pending: false
    });
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <PasswordResetContainer>
          <BackLink to="/">
            <BackText>
              <IoIosArrowBack /> Back
            </BackText>
          </BackLink>
          <Title>Reset Password</Title>
          <SubTitle>Don't worry. We've all been there.</SubTitle>
          <Input
            placeholder="Email"
            type="email"
            value={this.state.resetEmail}
            name="resetEmail"
            onChange={this.handleInput}
          />

          {this.state.error && (
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
          )}

          {this.state.success && (
            <SuccessMessage>
              Email sent! You should receive a reset link shortly.
            </SuccessMessage>
          )}

          <Button
            fullWidth
            isLoading={this.state.pending}
            onClick={this.handleForgotPassword}
          >
            Send Reset Email
          </Button>
        </PasswordResetContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.lightGrey};
  ${p => p.theme.flexAllCenter}
`;

const PasswordResetContainer = styled.div`
  width: 25vw;
  height: fit-content;
  min-width: 300px;
  background: white;
  ${p => p.theme.boxShadow}
  padding: 25px;
  border-radius: 3px;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  &:link,
  &:visited {
    color: inherit;
  }
`;

const BackText = styled(Text)`
  display: flex;
  align-items: center;
  color: #777777;
  & svg {
    font-size: 1.2em;
    margin-right: 3px;
    padding-bottom: 2px;
  }
`;

const Title = styled.p`
  font-size: 1.5em;
  font-family: "Avenir";
  font-weight: bold;
  text-align: center;
  line-height: 150%;
  margin-top: 25px;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-family: "Avenir";
  text-align: center;
  line-height: 150%;
  margin-bottom: 25px;
`;

const ErrorMessage = styled(Text)`
  color: ${p => p.theme.red};
  text-align: center;
  font-weight: bold;
  line-height: 150%;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const SuccessMessage = styled(Text)`
  color: ${p => p.theme.green};
  text-align: center;
  font-weight: bold;
  line-height: 150%;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export default PasswordReset;

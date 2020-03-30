import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import { Button } from "../../../ui/StyledComponents";

class ViewForm extends Component {
  render() {
    const { formLink } = this.props.match.params;
    return (
      <Container>
        <Header formName={"Contact Form"} />
        <FormContainer>
          <p>Viewing form ${formLink}</p>
        </FormContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 75vw;
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  ${p => p.theme.flexAllCenter};
  height: 100%;
`;

const mapState = state => ({ forms: state.forms.forms });
const mapDispatch = {};

export default connect(mapState, mapDispatch)(ViewForm);

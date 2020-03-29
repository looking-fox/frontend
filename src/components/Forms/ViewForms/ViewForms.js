import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getForms } from "../../../thunks/formThunk";
import { Text } from "../../../ui/StyledComponents";

class ViewForms extends Component {
  async componentDidMount() {
    await this.props.getForms();
  }

  render() {
    return <Container>{/* <Text>View Forms</Text> */}</Container>;
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 15vw;
  box-sizing: border-box;
  padding-top: 25px;
`;

const mapState = state => {
  return { forms: state.forms.forms };
};

const mapDispatch = { getForms };

export default connect(mapState, mapDispatch)(ViewForms);

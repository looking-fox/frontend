import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class ViewForms extends Component {
  componentDidMount() {
    // Logic for getting forms
  }

  render() {
    console.log("PROPS: ", this.props);
    return (
      <Container>
        <p>View Forms</p>
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${p => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 15vw;
  box-sizing: border-box;
  padding-top: 25px;
`;

const mapState = state => {
  return { forms: state.forms.forms };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(ViewForms);

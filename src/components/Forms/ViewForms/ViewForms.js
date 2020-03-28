import React, { Component } from "react";
import styled from "styled-components";

class ViewForms extends Component {
  render() {
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

export default ViewForms;

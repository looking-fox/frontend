import React, { Component } from "react";
import styled from "styled-components";

class ViewForm extends Component {
  render() {
    const { formLink } = this.props.match.params;
    return (
      <Container>
        <p>Viewing form ${formLink}</p>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 75vw;
  background: ${p => p.theme.lightGrey};
  ${p => p.theme.flexAllCenter};
`;

export default ViewForm;

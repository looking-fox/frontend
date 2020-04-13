import React, { Component } from "react";
import styled from "styled-components";

class ViewTasks extends Component {
  render() {
    return (
      <Container>
        <p>View Tasks</p>
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${(p) => p.theme.lightGrey};
  overflow-y: auto;
  padding: 0 20vw;
`;

export default ViewTasks;

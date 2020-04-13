import React, { Component } from "react";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";

class ViewTasks extends Component {
  render() {
    return (
      <Container>
        <TaskColumn title="Backlog" />
        <TaskColumn title="Next Up" />
        <TaskColumn title="In Progress" />
        <TaskColumn title="Completed" />
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${(p) => p.theme.lightGrey};
  display: flex;
  padding: 0px 50px;
`;

export default ViewTasks;

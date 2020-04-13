import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import { getTasks } from "../../../thunks/taskThunk";

class ViewTasks extends Component {
  async componentDidMount() {
    await this.props.getTasks();
    console.log("Tasks: ", this.props.tasks);
  }

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

const mapState = (state) => ({ tasks: state.tasks.tasks });
const mapDispatch = { getTasks };

export default connect(mapState, mapDispatch)(ViewTasks);

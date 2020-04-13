import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import { getTasks } from "../../../thunks/taskThunk";

class ViewTasks extends Component {
  async componentDidMount() {
    await this.props.getTasks();
  }

  render() {
    const { taskColumns } = this.props;
    return (
      <Container>
        {taskColumns.map((column, idx) => {
          return (
            <TaskColumn column={column} key={column.taskColumnId || idx} />
          );
        })}
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

const mapState = (state) => ({ taskColumns: state.tasks.taskColumns });
const mapDispatch = { getTasks };

export default connect(mapState, mapDispatch)(ViewTasks);

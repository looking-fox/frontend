import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import { getTasks, addTask, updateTask } from "../../../thunks/taskThunk";

class ViewTasks extends Component {
  async componentDidMount() {
    await this.props.getTasks();
  }

  handleAddTask = async (columnId) => {
    await this.props.addTask(columnId);
  };

  handleUpdateTask = async (taskId, task) => {
    console.log("Task ID: ", taskId);
    console.log("Task: ", task);
    await this.props.updateTask(taskId, task);
  };

  render() {
    const { taskColumns } = this.props;
    return (
      <Container>
        {taskColumns.map((column, idx) => {
          return (
            <TaskColumn
              column={column}
              key={column.taskColumnId || idx}
              handleAddTask={this.handleAddTask}
              handleUpdateTask={this.handleUpdateTask}
            />
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
const mapDispatch = { getTasks, addTask, updateTask };

export default connect(mapState, mapDispatch)(ViewTasks);

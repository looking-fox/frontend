import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import TaskModal from "../TaskModal/TaskModal";
import {
  getTasks,
  addTask,
  updatePartialTask,
} from "../../../thunks/taskThunk";

class ViewTasks extends Component {
  async componentDidMount() {
    await this.props.getTasks();
  }

  handleAddTask = async (columnId) => {
    await this.props.addTask(columnId);
  };

  handleUpdateTask = async (taskId, task) => {
    await this.props.updatePartialTask(taskId, task);
  };

  render() {
    const { taskColumns, showModal } = this.props;
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
        {showModal && <TaskModal />}
      </Container>
    );
  }
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background: ${(p) => p.theme.colors.lightGrey};
  display: flex;
  padding: 0px 50px;
  box-sizing: border-box;
  overflow-y: auto;
`;

const mapState = (state) => ({
  taskColumns: state.tasks.taskColumns,
  showModal: state.tasks.showModal,
});
const mapDispatch = { getTasks, addTask, updatePartialTask };

export default connect(mapState, mapDispatch)(ViewTasks);

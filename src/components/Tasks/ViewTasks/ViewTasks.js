import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import TaskModal from "../TaskModal/TaskModal";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import {
  getTasks,
  addTask,
  updatePartialTask,
  updateTaskLocation,
} from "../../../thunks/taskThunk";

const ViewTasks = ({
  taskColumns,
  showModal,
  getTasks,
  addTask,
  updatePartialTask,
  updateTaskLocation,
}) => {
  useEffect(() => {
    async function loadTasks() {
      await getTasks();
    }
    loadTasks();
  }, []);

  const handleAddTask = async (location) => await addTask(location);

  const handleUpdateTask = async (taskId, task) => {
    await updatePartialTask(taskId, task);
  };

  const handleDrop = useCallback(
    async (taskCard) => {
      const { taskId } = taskCard.item || {};
      await updateTaskLocation(taskId, taskCard);
    },
    [updateTaskLocation]
  );

  return (
    <Container>
      <DndProvider backend={Backend}>
        {taskColumns.map((column, idx) => {
          return (
            <TaskColumn
              column={column}
              columnIndex={idx}
              key={column.taskColumnId || idx}
              handleAddTask={handleAddTask}
              handleUpdateTask={handleUpdateTask}
              handleDrop={(item) => handleDrop(item, column)}
            />
          );
        })}
      </DndProvider>
      {showModal && <TaskModal />}
    </Container>
  );
};

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
const mapDispatch = {
  getTasks,
  addTask,
  updatePartialTask,
  updateTaskLocation,
};

export default connect(mapState, mapDispatch)(ViewTasks);

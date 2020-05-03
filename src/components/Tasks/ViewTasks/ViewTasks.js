import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import TaskModal from "../TaskModal/TaskModal";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import ItemTypes from "./ItemTypes";
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

  const handleDrop = useCallback(async (task, column) => {
    const { taskId, currentColumnId } = task;
    const {
      taskColumnOrder: newColumnIndex,
      taskColumnId: newColumnId,
    } = column;
    await updateTaskLocation(taskId, {
      currentColumnId,
      newColumnId,
      newColumnIndex,
    });
  }, []);

  return (
    <Container>
      <DndProvider backend={Backend}>
        {taskColumns.map((column, idx) => {
          return (
            <TaskColumn
              accept={ItemTypes.CARD}
              column={column}
              key={column.taskColumnId || idx}
              handleAddTask={handleAddTask}
              handleUpdateTask={handleUpdateTask}
              onDrop={(item) => handleDrop(item, column)}
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

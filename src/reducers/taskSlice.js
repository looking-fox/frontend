import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskColumns: [],
  currentTask: {},
  showModal: false,
};

const searchIndex = (resource, idString, id) => {
  return resource.findIndex((item) => item[idString] === id);
};

const taskSlice = createSlice({
  name: "task_columns",
  initialState,
  reducers: {
    getTasksSuccess(state, action) {
      const { payload } = action;
      state.taskColumns = payload.taskColumns;
    },
    getTasksFail() {
      console.log("Redux failed to GET tasks.");
    },
    addTaskSuccess(state, action) {
      const { newTask, columnId } = action.payload;
      const idx = searchIndex(state.taskColumns, "taskColumnId", columnId);
      state.taskColumns[idx].tasks.push(newTask);
    },
    addTaskFail() {
      console.log("Redux failed to POST task.");
    },
    updateTaskSuccess(state, action) {
      const { taskColumns } = state;
      const { taskId, updatedTask } = action.payload;
      const { taskColumnId } = updatedTask;
      const columnIdx = searchIndex(taskColumns, "taskColumnId", taskColumnId);
      const idx = searchIndex(taskColumns[columnIdx].tasks, "taskId", taskId);
      taskColumns[columnIdx].tasks.splice(idx, 1, updatedTask);
    },
    updateTaskFail() {
      console.log("Redux failed to PUT task.");
    },
    toggleModal(state, action) {
      state.showModal = !state.showModal;
      if (action.payload.task) state.currentTask = action.payload.task;
      else state.currentTask = {};
    },
  },
});

// Export actions for dispatch //
export const {
  getTasksSuccess,
  getTasksFail,
  addTaskSuccess,
  addTaskFail,
  updateTaskSuccess,
  updateTaskFail,
  toggleModal,
} = taskSlice.actions;
// Export actions for dispatch //

export default taskSlice.reducer;

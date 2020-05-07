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
      const { newTask } = action.payload;
      const idx = searchIndex(
        state.taskColumns,
        "taskColumnId",
        newTask.taskColumnId
      );
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
      if (action.payload && action.payload.task) {
        state.currentTask = action.payload.task;
      } else state.currentTask = {};
    },
    hideModal(state, action) {
      state.showModal = false;
      state.currentTask = {};
    },
    updateTaskLocationSuccess(state, action) {
      console.log("PAYLOAD: ", action.payload);
    },
    updateTaskLocationFail(state, action) {
      console.log("Redux failed to PUT new task location.");
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
  hideModal,
  updateTaskLocationSuccess,
  updateTaskLocationFail,
} = taskSlice.actions;
// Export actions for dispatch //

export default taskSlice.reducer;

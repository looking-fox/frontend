import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskColumns: [],
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
      const idx = state.taskColumns.findIndex(
        (col) => col.taskColumnId === columnId
      );
      state.taskColumns[idx].tasks.push(newTask);
    },
    addTaskFail() {
      console.log("Redux failed to POST task.");
    },
    updateTaskSuccess(state, action) {
      console.log("Payload: ", action.payload);
    },
    updateTaskFail() {
      console.log("Redux failed to PUT task.");
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
} = taskSlice.actions;
// Export actions for dispatch //

export default taskSlice.reducer;

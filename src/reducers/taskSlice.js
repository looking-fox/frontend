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
  },
});

// Export actions for dispatch //
export const {
  getTasksSuccess,
  getTasksFail,
  addTaskSuccess,
  addTaskFail,
} = taskSlice.actions;
// Export actions for dispatch //

export default taskSlice.reducer;

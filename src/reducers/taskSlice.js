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
      console.log("Redux failed to GET forms.");
    },
  },
});

// Export actions for dispatch //
export const { getTasksSuccess, getTasksFail } = taskSlice.actions;
// Export actions for dispatch //

export default taskSlice.reducer;

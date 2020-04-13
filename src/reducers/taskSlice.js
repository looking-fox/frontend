import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasksSuccess(state, action) {
      const { payload } = action;
      state.tasks = payload.tasks;
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

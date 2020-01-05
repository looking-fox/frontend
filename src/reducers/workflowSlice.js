import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflows: []
};

const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    getWorkflowsSuccess(state, action) {
      console.log("Redux Workflows: ", action.payload);
      state.workflows = action.payload;
    },
    getWorkflowsFail(state, action) {
      console.log("Redux Workflows Failed");
    }
  }
});

// Export actions for dispatch //
export const { getWorkflowsSuccess, getWorkflowsFail } = workflowSlice.actions;
// Export actions for dispatch //

export default workflowSlice.reducer;

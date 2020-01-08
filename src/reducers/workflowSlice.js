import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflows: []
};

const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    getWorkflowsSuccess(state, action) {
      state.workflows = action.payload;
    },
    getWorkflowsFail(state, action) {
      console.log("Redux Workflows Failed");
    },
    addWorkflowSuccess(state, action) {
      state.workflows.push(action.payload);
    },
    addWorkflowFail(state, action) {
      console.log("Redux Add Workflow Failed");
    },
    deleteWorkflowSuccess(state, action) {
      const indexToRemove = state.workflows.findIndex(
        item => item.wfId == action.payload
      );
      if (indexToRemove >= 0) {
        state.workflows.splice(indexToRemove, 1);
      }
    },
    deleteWorkflowFail(state, action) {
      console.log("Redux Delete Workflow Failed");
    }
  }
});

// Export actions for dispatch //
export const {
  getWorkflowsSuccess,
  getWorkflowsFail,
  addWorkflowSuccess,
  addWorkflowFail,
  deleteWorkflowSuccess,
  deleteWorkflowFail
} = workflowSlice.actions;
// Export actions for dispatch //

export default workflowSlice.reducer;

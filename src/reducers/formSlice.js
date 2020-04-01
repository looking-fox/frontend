import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: []
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    getFormsSuccess(state, action) {
      state.forms = action.payload.forms;
    },
    getFormsFail(state, action) {
      console.log("Redux failed to GET forms.");
    },
    addFormDraftSuccess(state, action) {
      state.forms = action.payload.forms;
      // TO DO: logic to replace current form w/ new draft
    },
    addFormDraftFail(state, action) {
      console.log("Redux failed to POST draft form.");
    },
    updateFormSuccess(state, action) {
      state.forms = action.payload.forms;
    },
    updateFormFail(state, action) {
      console.log("Redux failed to UPDATE form.");
    }
  }
});

// Export actions for dispatch //
export const {
  getFormsSuccess,
  getFormsFail,
  addFormDraftSuccess,
  addFormDraftFail,
  updateFormSuccess,
  updateFormFail
} = formSlice.actions;
// Export actions for dispatch //

export default formSlice.reducer;

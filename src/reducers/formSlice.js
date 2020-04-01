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
    updateFormSuccess(state, action) {
      state.formss = action.payload.forms;
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
  updateFormSuccess,
  updateFormFail
} = formSlice.actions;
// Export actions for dispatch //

export default formSlice.reducer;

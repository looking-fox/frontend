import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: []
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    getFormsSuccess(state, action) {
      const { payload } = action;
      state.forms = payload.forms;
    },
    getFormsFail(state, action) {
      console.log("Redux failed to GET forms.");
    },
    addFormDraftSuccess(state, action) {
      const { updatedForm, previousFormId } = action.payload;
      const idx = state.forms.findIndex(form => form.formId === previousFormId);
      state.forms.splice(idx, 1, updatedForm);
    },
    addFormDraftFail(state, action) {
      console.log("Redux failed to POST draft form.");
    },
    updateFormDraftSuccess(state, action) {
      //Logic
    },
    updateFormDraftFail() {
      console.log("Redux failed to UPDATE draft form.");
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
  updateFormDraftSuccess,
  updateFormDraftFail,
  updateFormSuccess,
  updateFormFail
} = formSlice.actions;
// Export actions for dispatch //

export default formSlice.reducer;

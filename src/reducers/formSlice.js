import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
  currentFormLink: null,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    getFormsSuccess(state, action) {
      const { payload } = action;
      state.forms = payload.forms;
      state.currentFormLink = payload.currentFormLink;
    },
    getFormsFail() {
      console.log("Redux failed to GET forms.");
    },
    addNewFormSuccess(state, action) {
      const { newForm } = action.payload;
      state.forms.push(newForm);
      state.currentFormLink = newForm.formLink;
    },
    addNewFormFail() {
      console.log("Redux failed to POST new form.");
    },
    addFormDraftSuccess(state, action) {
      const { updatedForm, previousFormId } = action.payload;
      const idx = state.forms.findIndex(
        (form) => form.formId === previousFormId
      );
      state.forms.splice(idx, 1, updatedForm);
      state.currentFormLink = updatedForm.formLink;
    },
    addFormDraftFail() {
      console.log("Redux failed to POST draft form.");
    },
    publishFormSuccess(state, action) {
      const { newPublishedForm, formId } = action.payload;
      const idx = state.forms.findIndex((form) => form.formId === formId);
      state.forms.splice(idx, 1, newPublishedForm);
      state.currentFormLink = newPublishedForm.formLink;
    },
    publishFormFail() {
      console.log("Redux failed to POST published form.");
    },
    updateFormDraftSuccess(state, action) {
      const { formId, updatedFormDraft } = action.payload;
      const idx = state.forms.findIndex((form) => form.formId === formId);
      state.forms.splice(idx, 1, updatedFormDraft);
      state.currentFormLink = updatedFormDraft.formLink;
    },
    updateFormDraftFail() {
      console.log("Redux failed to UPDATE draft form.");
    },
    updateFormSuccess(state, action) {
      state.forms = action.payload.forms;
    },
    updateFormFail() {
      console.log("Redux failed to UPDATE form.");
    },
  },
});

// Export actions for dispatch //
export const {
  getFormsSuccess,
  getFormsFail,
  addNewFormSuccess,
  addNewFormFail,
  addFormDraftSuccess,
  addFormDraftFail,
  publishFormSuccess,
  publishFormFail,
  updateFormDraftSuccess,
  updateFormDraftFail,
  updateFormSuccess,
  updateFormFail,
} = formSlice.actions;
// Export actions for dispatch //

export default formSlice.reducer;

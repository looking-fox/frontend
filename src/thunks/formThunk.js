import api from "../api/api";
import {
  getFormsSuccess,
  getFormsFail,
  updateFormDraftSuccess,
  updateFormDraftFail,
  updateFormSuccess,
  updateFormFail,
  addFormDraftSuccess,
  addFormDraftFail
} from "../reducers/formSlice";

const getForms = () => async dispatch => {
  try {
    const { data } = await api.form.getForms();
    dispatch(getFormsSuccess(data));
  } catch (err) {
    dispatch(getFormsFail(err));
  }
};

const addFormDraft = formDraft => async dispatch => {
  try {
    const { data } = await api.form.addFormDraft(formDraft);
    dispatch(addFormDraftSuccess(data));
  } catch (err) {
    console.log("error: ", err);
    dispatch(addFormDraftFail(err));
  }
};

const updateFormDraft = (formId, updatedFormDraft) => async dispatch => {
  try {
    const { data } = await api.form.updateFormDraft(formId, updatedFormDraft);
    dispatch(updateFormDraftSuccess(data));
  } catch (err) {
    dispatch(updateFormDraftFail(err));
  }
};

const updateForm = (formId, updatedForm) => async dispatch => {
  try {
    const { data } = await api.form.updateForm(formId, updatedForm);
    dispatch(updateFormSuccess(data));
  } catch (err) {
    dispatch(updateFormFail(err));
  }
};

export { getForms, addFormDraft, updateFormDraft, updateForm };

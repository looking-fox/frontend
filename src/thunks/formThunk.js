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
    if (data.forms.length) {
      const { formLink } = data.forms[0];
      data.currentFormLink = formLink;
    } else {
      data.currentFormLink = null;
    }
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
    if (data.forms.length) {
      const { formLink } = data.forms[0];
      data.currentFormLink = formLink;
    } else {
      data.currentFormLink = null;
    }
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

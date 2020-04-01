import api from "../api/api";
import {
  getFormsSuccess,
  getFormsFail,
  updateFormSuccess,
  updateFormFail
} from "../reducers/formSlice";

const getForms = () => async dispatch => {
  try {
    const { data } = await api.form.getForms();
    dispatch(getFormsSuccess(data));
  } catch (err) {
    dispatch(getFormsFail(err));
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

export { getForms, updateForm };

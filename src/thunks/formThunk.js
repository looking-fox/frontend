import api from "../api/api";
import { getFormsSuccess, getFormsFail } from "../reducers/formSlice";

const getForms = () => async dispatch => {
  try {
    const { data } = await api.form.getForms();
    dispatch(getFormsSuccess(data));
  } catch (err) {
    dispatch(getFormsFail(err));
  }
};

export { getForms };

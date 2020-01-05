import api from "../api/api";
import {
  getWorkflowsSuccess,
  getWorkflowsFail
} from "../reducers/workflowSlice";

const getWorkflows = () => async dispatch => {
  try {
    const { data } = await api.workflow.getWorkflows();
    dispatch(getWorkflowsSuccess(data.workflows));
  } catch (err) {
    dispatch(getWorkflowsFail(err));
  }
};

export { getWorkflows };

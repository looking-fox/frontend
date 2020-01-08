import api from "../api/api";
import {
  getWorkflowsSuccess,
  getWorkflowsFail,
  addWorkflowSuccess,
  addWorkflowFail,
  deleteWorkflowSuccess,
  deleteWorkflowFail
} from "../reducers/workflowSlice";

const getWorkflows = () => async dispatch => {
  try {
    const { data } = await api.workflow.getWorkflows();
    dispatch(getWorkflowsSuccess(data.workflows));
  } catch (err) {
    dispatch(getWorkflowsFail(err));
  }
};

const addWorkflow = newWorkflow => async dispatch => {
  try {
    const { data } = await api.workflow.addWorkflow(newWorkflow);
    dispatch(addWorkflowSuccess(data.newWorkflow));
  } catch (err) {
    dispatch(addWorkflowFail(err));
  }
};

const deleteWorkflow = wfId => async dispatch => {
  try {
    const res = await api.workflow.deleteWorkflow(wfId);
    console.log("Res: ", res);
    dispatch(deleteWorkflowSuccess(wfId));
  } catch (err) {
    dispatch(deleteWorkflowFail(err));
  }
};

export { getWorkflows, addWorkflow, deleteWorkflow };

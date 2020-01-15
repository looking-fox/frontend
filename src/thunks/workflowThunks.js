import api from "../api/api";
import {
  getWorkflowsSuccess,
  getWorkflowsFail,
  addWorkflowSuccess,
  addWorkflowFail,
  updateWorkflowSuccess,
  updateWorkflowFail,
  archiveWorkflowSuccess,
  archiveWorkflowFail
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

const updateWorkflow = updatedWorkflow => async dispatch => {
  try {
    await api.workflow.updateWorkflow(updatedWorkflow);
    dispatch(updateWorkflowSuccess(updatedWorkflow));
  } catch (err) {
    dispatch(updateWorkflowFail(err));
  }
};

const archiveWorkflow = wfId => async dispatch => {
  try {
    await api.workflow.archiveWorkflow(wfId);
    dispatch(archiveWorkflowSuccess(wfId));
  } catch (err) {
    dispatch(archiveWorkflowFail(err));
  }
};

export { getWorkflows, addWorkflow, updateWorkflow, archiveWorkflow };

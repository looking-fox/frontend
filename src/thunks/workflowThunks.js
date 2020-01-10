import api from "../api/api";
import {
  getWorkflowsSuccess,
  getWorkflowsFail,
  addWorkflowSuccess,
  addWorkflowFail,
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

const archiveWorkflow = wfId => async dispatch => {
  try {
    const res = await api.workflow.archiveWorkflow(wfId);
    console.log("Res: ", res);
    dispatch(archiveWorkflowSuccess(wfId));
  } catch (err) {
    dispatch(archiveWorkflowFail(err));
  }
};

export { getWorkflows, addWorkflow, archiveWorkflow };

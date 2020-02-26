import api from "../api/api";
import {
  getClientsSuccess,
  getClientsFail,
  updateClientProgressSuccess,
  updateClientProgressFail
} from "../reducers/clientSlice";

const getClients = () => async dispatch => {
  try {
    const { data } = await api.client.getClients();
    dispatch(getClientsSuccess(data));
  } catch (err) {
    dispatch(getClientsFail(err));
  }
};

const updateClientProgress = clientInfo => async dispatch => {
  try {
    await api.client.updateClientProgress(clientInfo);
    dispatch(updateClientProgressSuccess(clientInfo));
  } catch (err) {
    dispatch(updateClientProgressFail(err));
  }
};

export { getClients, updateClientProgress };

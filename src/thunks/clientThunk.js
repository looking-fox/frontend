import api from "../api/api";
import {
  getClientsSuccess,
  getClientsFail,
  updateClientProgressSuccess,
  updateClientProgressFail,
  addClientSuccess,
  addClientFail
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

const addClient = newClient => async dispatch => {
  try {
    const { data } = await api.client.addClient(newClient);
    dispatch(addClientSuccess(data.newClient));
  } catch (err) {
    dispatch(addClientFail(err));
  }
};

export { getClients, updateClientProgress, addClient };

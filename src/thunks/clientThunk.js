import api from "../api/api";
import { getClientsSuccess, getClientsFail } from "../reducers/clientSlice";

const getClients = () => async dispatch => {
  try {
    const { data } = await api.client.getClients();
    dispatch(getClientsSuccess(data));
  } catch (err) {
    dispatch(getClientsFail(err));
  }
};

export { getClients };

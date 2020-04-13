import api from "../api/api";
import { getTasksSuccess, getTasksFail } from "../reducers/taskSlice";

const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.client.getTasks();
    dispatch(getTasksSuccess(data));
  } catch (err) {
    dispatch(getTasksFail(err));
  }
};

export { getTasks };

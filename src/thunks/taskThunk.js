import api from "../api/api";
import { getTasksSuccess, getTasksFail } from "../reducers/taskSlice";

const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.task.getTasks();
    dispatch(getTasksSuccess(data));
  } catch (err) {
    dispatch(getTasksFail(err));
  }
};

export { getTasks };

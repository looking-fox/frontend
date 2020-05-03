import api from "../api/api";
import {
  getTasksSuccess,
  getTasksFail,
  addTaskSuccess,
  addTaskFail,
  updateTaskSuccess,
  updateTaskFail,
} from "../reducers/taskSlice";

const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.task.getTasks();
    dispatch(getTasksSuccess(data));
  } catch (err) {
    dispatch(getTasksFail(err));
  }
};

const addTask = (columnId) => async (dispatch) => {
  try {
    const { data } = await api.task.addTask({ columnId });
    dispatch(addTaskSuccess(data));
  } catch (err) {
    dispatch(addTaskFail(err));
  }
};

const updatePartialTask = (taskId, task) => async (dispatch) => {
  try {
    const { data } = await api.task.updatePartialTask(taskId, task);
    dispatch(updateTaskSuccess(data));
  } catch (err) {
    dispatch(updateTaskFail(err));
  }
};

const updateFullTask = (taskId, task) => async (dispatch) => {
  try {
    const { data } = await api.task.updateFullTask(taskId, task);
    dispatch(updateTaskSuccess(data));
  } catch (err) {
    dispatch(updateTaskFail(err));
  }
};

export { getTasks, addTask, updatePartialTask, updateFullTask };

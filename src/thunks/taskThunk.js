import api from "../api/api";
import {
  getTasksSuccess,
  getTasksFail,
  addTaskSuccess,
  addTaskFail,
  updateTaskSuccess,
  updateTaskFail,
  updateTaskLocationSuccess,
  updateTaskLocationFail,
} from "../reducers/taskSlice";

const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.task.getTasks();
    dispatch(getTasksSuccess(data));
  } catch (err) {
    dispatch(getTasksFail(err));
  }
};

const addTask = (location) => async (dispatch) => {
  try {
    const { data } = await api.task.addTask({ location });
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

const updateTaskLocation = (taskId, taskCard) => async (dispatch) => {
  try {
    const { data } = await api.task.updateTaskLocation(taskId, taskCard);
    dispatch(updateTaskLocationSuccess(data));
  } catch (err) {
    dispatch(updateTaskLocationFail(err));
  }
};

export {
  getTasks,
  addTask,
  updatePartialTask,
  updateFullTask,
  updateTaskLocation,
};

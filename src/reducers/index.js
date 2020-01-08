import { combineReducers } from "redux";
import userReducer from "./userSlice";
import workflowReducer from "./workflowSlice";
import toastReducer from "./toastSlice";

export default combineReducers({
  user: userReducer,
  workflow: workflowReducer,
  toast: toastReducer
});

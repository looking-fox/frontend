import { combineReducers } from "redux";
import userReducer from "./userSlice";
import workflowReducer from "./workflowSlice";
import clientReducer from "./clientSlice";
import toastReducer from "./toastSlice";

export default combineReducers({
  user: userReducer,
  workflow: workflowReducer,
  client: clientReducer,
  toast: toastReducer
});

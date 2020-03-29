import { combineReducers } from "redux";
import userReducer from "./userSlice";
import workflowReducer from "./workflowSlice";
import clientReducer from "./clientSlice";
import toastReducer from "./toastSlice";
import formReducer from "./formSlice";

export default combineReducers({
  user: userReducer,
  workflows: workflowReducer,
  clients: clientReducer,
  forms: formReducer,
  toast: toastReducer
});

import { combineReducers } from "redux";
import userReducer from "./userSlice";
import workflowReducer from "./workflowSlice";

export default combineReducers({
  user: userReducer,
  workflow: workflowReducer
});

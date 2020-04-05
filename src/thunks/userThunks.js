import api from "../api/api";
import {
  authStatusSuccess,
  loginSuccess,
  loginFail,
  logoutSuccess,
  signUpSuccess,
} from "../reducers/userSlice";

const login = (userId) => async (dispatch) => {
  try {
    const { data } = await api.authentication.login(userId);
    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(loginFail(err));
  }
};

const checkAuthStatus = () => async (dispatch) => {
  try {
    const { data } = await api.authentication.checkAuthenticationStatus();
    dispatch(authStatusSuccess(data));
  } catch (err) {
    // Handle Error
  }
};

const logout = () => async (dispatch) => {
  try {
    await api.authentication.logout();
    dispatch(logoutSuccess());
  } catch (err) {
    // Handle Error
  }
};

const signUp = (newUser) => async (dispatch) => {
  try {
    const { data } = await api.authentication.signUp(newUser);
    dispatch(signUpSuccess(data.user));
  } catch (err) {
    // Handle Error
  }
};

export { login, logout, checkAuthStatus, signUp };

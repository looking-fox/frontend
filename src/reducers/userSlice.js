import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  isAuthenticated: null,
  reachedFreemiumLimit: false,
  isPremiumUser: false,
  displayName: "",
  email: "",
  userId: null,
  error: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStatusSuccess(state, action) {
      state.isAuthenticated = action.payload;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
    },
    loginFail(state, action) {
      state.error = true;
    },
    logoutSuccess(state, action) {
      const loggedOutInitialState = { ...initialState };
      loggedOutInitialState.isAuthenticated = false;
      return loggedOutInitialState;
    }
  }
});

// Export actions for dispatch //
export const {
  authStatusSuccess,
  loginSuccess,
  loginFail,
  logoutSuccess
} = userSlice.actions;
// Export actions for dispatch //

//--Thunks--//
const login = userId => async dispatch => {
  try {
    const { data } = await api.authentication.login(userId);
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFail(err));
  }
};

const checkAuthStatus = () => async dispatch => {
  try {
    const { data } = await api.authentication.checkAuthenticationStatus();
    const authStatus = data.isAuthenticated || false;
    dispatch(authStatusSuccess(authStatus));
  } catch (err) {
    // Handle Error
  }
};

const logout = () => async dispatch => {
  try {
    await api.authentication.logout();
    dispatch(logoutSuccess());
  } catch (err) {
    // Handle Error
  }
};
//--Thunks--//

export { login, logout, checkAuthStatus }; // Thunks

export default userSlice.reducer;

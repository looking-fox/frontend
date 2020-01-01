import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initialState = {
  isAuthenticated: null,
  reachedFreemiumLimit: false,
  isPremiumUser: false,
  uid: null,
  displayName: "",
  email: "",
  profilePhotoUrl: "",
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
    },
    signUpSuccess(state, action) {
      const newState = { ...state, ...action.payload };
      newState.isAuthenticated = true;
      return newState;
    }
  }
});

// Export actions for dispatch //
export const {
  authStatusSuccess,
  loginSuccess,
  loginFail,
  logoutSuccess,
  signUpSuccess
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

const signUp = newUser => async dispatch => {
  try {
    const { data } = await api.authentication.signUp(newUser);
    dispatch(signUpSuccess(data.user));
  } catch (err) {
    // Handle Error
  }
};
//--Thunks--//

export { login, logout, checkAuthStatus, signUp }; // Thunks

export default userSlice.reducer;

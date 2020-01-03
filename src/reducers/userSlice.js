import { createSlice } from "@reduxjs/toolkit";

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
      const newState = { ...state, ...action.payload };
      newState.isAuthenticated = true;
      return newState;
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

export default userSlice.reducer;

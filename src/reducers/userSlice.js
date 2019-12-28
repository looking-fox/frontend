import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  reachedFreemiumLimit: false,
  isPremiumUser: false,
  displayName: "",
  email: "",
  userId: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    logout(state, action) {
      return initialState;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

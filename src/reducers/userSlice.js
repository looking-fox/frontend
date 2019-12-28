import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  reachedFreemiumLimit: false,
  isPremiumUser: false,
  displayName: "",
  email: "",
  userId: null,
  starWarsInfo: {},
  error: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.starWarsInfo = action.payload;
    },
    loginFail(state, action) {
      state.error = true;
    },
    logout(state, action) {
      return initialState;
    }
  }
});

//--Thunks--//
const login = () => async dispatch => {
  try {
    const { data } = await axios.get("https://swapi.co/api/people/44");
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFail(err));
  }
};
//--Thunks--//

export const { loginSuccess, loginFail, logout } = userSlice.actions; // Actions
export { login }; // Thunks
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showToast: false,
  success: false,
  error: false,
  message: ""
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess(state, action) {
      state.showToast = true;
      state.success = true;
      state.message = action.payload;
    },
    toastFail(state, action) {
      state.showToast = true;
      state.error = true;
      state.message = action.payload;
    },
    toastReset(state, action) {
      return initialState;
    }
  }
});

// Export actions for dispatch //
export const { toastSuccess, toastFail, toastReset } = toastSlice.actions;
// Export actions for dispatch //

export default toastSlice.reducer;

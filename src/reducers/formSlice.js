import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: []
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    getFormsSuccess(state, action) {
      state.forms = action.payload.forms;
    },
    getFormsFail(state, action) {
      console.log("Redux failed to get Forms");
    }
  }
});

// Export actions for dispatch //
export const { getFormsSuccess, getFormsFail } = formSlice.actions;
// Export actions for dispatch //

export default formSlice.reducer;

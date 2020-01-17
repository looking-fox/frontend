import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: []
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClientsSuccess(state, action) {
      state.clients = action.payload.clients;
    },
    getClientsFail(state, action) {
      console.log("Redux failed to get Clients");
    }
  }
});

// Export actions for dispatch //
export const { getClientsSuccess, getClientsFail } = clientSlice.actions;
// Export actions for dispatch //

export default clientSlice.reducer;

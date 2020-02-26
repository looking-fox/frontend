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
    },
    updateClientProgressSuccess(state, action) {
      const { clientId, newIndex } = action.payload;
      const idx = state.clients.findIndex(
        client => client.clientId === clientId
      );
      state.clients[idx]["currentWfIndex"] = newIndex;
    },
    updateClientProgressFail(state, action) {
      console.log("Redux failed to update Clients");
    }
  }
});

// Export actions for dispatch //
export const {
  getClientsSuccess,
  getClientsFail,
  updateClientProgressSuccess,
  updateClientProgressFail
} = clientSlice.actions;
// Export actions for dispatch //

export default clientSlice.reducer;

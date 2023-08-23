import { createSlice } from "@reduxjs/toolkit";
import serviceClient from "../services/apiClient";

const initialState = [];

export const sliceClient = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClients: (state, action) => {
      return action.payload.map((c) => (true ? { ...c, id: c.idCliente } : c));
    },
    addClient: (state, action) => {
      const newUser = { ...action.payload, id: action.payload.idCliente };
      state.push(newUser);
    },
    updateClient: (state, action) => {
      return state.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    },
    deleteClient: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { setClients, addClient, updateClient, deleteClient } =
  sliceClient.actions;

export default sliceClient.reducer;

export const initializeClient = () => {
  return async (dispatch) => {
    const clients = await serviceClient.getAllClients();
    dispatch(setClients(clients));
  };
};

export const deleteOneClient = (idClient) => {
  return async (dispatch) => {
    await serviceClient.deleteClient(idClient);
    dispatch(deleteClient(idClient));
  };
};

export const updateOneClient = (client) => {
  return async (dispatch) => {
    await serviceClient.updateClient(client);
    dispatch(updateClient(client));
  };
};

export const addOneClient = (client) => {
  return async (dispatch) => {
    await serviceClient.addClient(client);
    dispatch(addClient(client));
  };
};

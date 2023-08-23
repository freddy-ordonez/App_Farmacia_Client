import { createSlice } from "@reduxjs/toolkit";
import serviceUser from "../services/apiUser";

const initialState = [];

export const sliceShoopinCart = createSlice({
  name: "cartShooping",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const verify = state.findIndex((c) => c.idProducto === action.payload.idProducto);
      console.log(action.payload);
      if (verify >= 0) {
        state[verify].cantidad++;
      } else {
        state.push({ ...action.payload, cantidad: 1 });
      }
    },
    subtractProduct: (state, action) => {
      const verify = state.findIndex((c) => c.idProducto === action.payload);
      if (verify >= 0 && state[verify].cantidad > 1) {
        state[verify].cantidad--;
      }
    },
    sumProduct: (state, action) => {
      const verify = state.findIndex((c) => c.idProducto === action.payload);
      if (verify >= 0) {
        state[verify].cantidad++;
      }
    },
  },
});

export const { subtractProduct, sumProduct, addProduct } =
  sliceShoopinCart.actions;

export default sliceShoopinCart.reducer;

import { createSlice } from '@reduxjs/toolkit';
import serviceBilling from "../services/apiBilling"

const initialState = []

export const sliceBilling= createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setBilling: (state, action) => {
      return action.payload.map(u => true ? {...u, id:u.idFacturacion} : u)
    },
    addBilling: (state, action) => {
      console.log(action.payload);
      const newBilling = {...action.payload, id:action.payload.idCliente}
      console.log(newBilling);
      state.push(newBilling)
    }
  },
});

export const { setBilling, addBilling} = sliceBilling.actions;

export default sliceBilling.reducer;

export const initializeBillig = ()=> {
  return async dispatch => {
    const billings = await serviceBilling.getAllUsers()
    dispatch(setBilling(billings))
  } 
}

export const addOneBilling = (billing)=> {
  return async dispatch => {
    await serviceBilling.addBilling(billing)
    dispatch(addBilling(billing))
  } 
}
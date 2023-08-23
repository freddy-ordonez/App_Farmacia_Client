import { createSlice } from '@reduxjs/toolkit';
import serviceUser from "../services/apiUser"

const initialState = []

export const sliceUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload.map(u => true ? {...u, id:u.idUsuario} : u)
    },
    addUser: (state, action) => {
      const newUser = {...action.payload, id:action.payload.idUsuario}
      state.push(newUser)
    },
    updateUser: (state, action) => {
      return state.map(u => u.id === action.payload.id ? action.payload : u)
    },
    deleteUser: (state, action) => {
        return state.filter(u=> u.id !== action.payload)
    }
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = sliceUser.actions;

export default sliceUser.reducer;

export const initializeUser = ()=> {
  return async dispatch => {
    const users = await serviceUser.getAllUsers()
    dispatch(setUsers(users))
  } 
}

export const deleteOneUser = (idUser)=> {
  return async dispatch => {
    await serviceUser.deleteUser(idUser)
    dispatch(deleteUser(idUser))
  } 
}

export const updateOneUser = (user)=> {
  return async dispatch => {
    await serviceUser.updateUser(user)
    dispatch(updateUser(user))
  } 
}

export const addOneUser = (user)=> {
  return async dispatch => {
    await serviceUser.addUser(user)
    const users = await serviceUser.getAllUsers()
    dispatch(setUsers(users))
  } 
}
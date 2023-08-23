import { createSlice } from "@reduxjs/toolkit"


const initialState = []

const sliceLogin = createSlice({
    name: "login",
    initialState,
    reducers: {
        login : (state, action)=> {
            state.push(action.payload)
        },
        logOut: (state, action)=> {
            return []
        }

    }
})

export const { login, logOut} = sliceLogin.actions

export default sliceLogin.reducer
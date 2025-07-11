import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:"",
    role:"",
    token:"",
    isLoggedIn: false,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginUser: (state,action)=>{
            state._id = action.payload.id
            state.role = action.payload.role
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logoutUser: (state)=>{
            state._id=""
            state.role=""
            state.token=""
            state.isLoggedIn=false
        },
    },
})

export const {loginUser, logoutUser} = userSlice.actions
export default userSlice.reducer
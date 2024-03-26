import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"userStates",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        userRequest: (state,action)=>{
            state.loading=true
        },
        userSuccess : (state,action)=>{
            state.loading=false;
            state.user=action.payload;
        },
        userFailure: (state,action)=>{
            state.loading=false
        },
        clearUser : (state,action)=>{
            state.user=null
        }
    }
})



export const {userFailure,userRequest,userSuccess ,clearUser} = userSlice.actions

export default userSlice.reducer
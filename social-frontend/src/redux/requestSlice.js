import { createSlice } from "@reduxjs/toolkit"

export const requestSlice= createSlice({

    name:"requests",
    initialState:{
        loading:false,
        message:null,
        error:null
    },
    reducers:{
    requestStart:(state,action)=>{
        state.loading=true
    },

    requestSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },

    requestFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },

    clearErrors : (state,action)=>{
        state.error=null;
    },

    clearMessage : (state,action)=>{
        state.message = null;
    },
    }
})


export const {requestStart,requestSuccess,requestFailure,clearErrors,clearMessage} =  requestSlice.actions

export default requestSlice.reducer
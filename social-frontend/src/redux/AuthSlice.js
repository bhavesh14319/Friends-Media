import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authStates",
    initialState:{
        isAuthenticated: false,
        openAuthModal:true,
        authLoading:false,
        authorizedUser:null,
        authMessage:null
    },

    reducers:{
        openAuthModal:(state,action)=>{
            state.openAuthModal=true
        },

        closeAuthModal:(state,action)=>{
            state.openAuthModal=false
        },
        authRequest : (state,action)=>{
            state.authLoading=true
        },
        // auth success will handle login and register success
        authSuccess : (state,action)=>{
            state.authLoading=false;
            state.isAuthenticated=true;
            state.authorizedUser=action.payload;
        },
        authFailure:(state,action)=>{
            state.authLoading=false;
            state.authMessage=action.payload
        },
        // logout success will handle logout req success
        logoutSuccess:(state,action)=>{
            state.authorizedUser=null;
        }

    }
})

export const {authLoading,authFailure,authRequest,authSuccess,openAuthModal,closeAuthModal,logoutSuccess} = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authStates",
    initialState:{
        isAuthenticated: false,
        openAuthModal:false,
        authLoading:false,
        authorizedUser:null,
        authMessage:null
    },

    reducers:{
        openAuthModal:(state,action)=>{
            state.openAuthModal=true
        },

        closeAuthModal:(state,action)=>{
            state.authLoading=false;
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
            state.isAuthenticated=false;
            state.authMessage=action.payload;
        },
        // logout success will handle logout req success
        logoutSuccess:(state,action)=>{
            state.isAuthenticated=false;
            state.authorizedUser=null;
            state.authLoading=false;
        },

        deleteAccountSuccess: (state,action)=>{
            state.isAuthenticated=false;
            state.authorizedUser=null;
            state.authLoading=false;
        }

    }
})

export const {authLoading,authFailure,authRequest,authSuccess,openAuthModal,closeAuthModal,logoutSuccess,deleteAccountSuccess} = authSlice.actions

export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState: {
        loading:false,
        user:null,
        error:null
    },

    reducers:{
        LoginRequest: (state,action)=>{
            state.loading=true;
        },
    
        LoginSuccess: (state,action) => {
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
        },
    
        LoginFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=false;
        },
    
    
        RegisterRequest:(state,action)=>{
            state.loading=true
        },
    
        RegisterSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
        },
    
        RegisterFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=false;
        },
    
    
        LoadUserRequest:(state,action)=>{
            state.loading=true
    
        },
    
        LoadUserSuccess:(state,action)=>{
            state.loading=false;
            state.user=action.payload;
            state.isAuthenticated=true;
        },
    
        LoadUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=false;
        },
    
        LogoutUserRequest : (state)=>{
            state.loading=true;
        },
    
        LogoutUserSuccess : (state,action)=>{
            state.loading=false;
            state.user=null;
            state.isAuthenticated=false;
        },
    
        LogoutUserFailure : (state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=true;
        },
    
        clearErrors : (state)=>{
            state.error=null;
        },
    }


})


export const {LoginRequest,LoginSuccess,LoginFailure,RegisterRequest, RegisterSuccess,RegisterFailure,LoadUserRequest,LoadUserSuccess,LoadUserFailure,clearErrors, LogoutUserRequest,LogoutUserSuccess,LogoutUserFailure}=  userSlice.actions
export default userSlice.reducer






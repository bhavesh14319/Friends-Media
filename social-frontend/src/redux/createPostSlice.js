import { createSlice } from "@reduxjs/toolkit";

const createPost = createSlice({
    name:"createPost",
    initialState:{
        openCreatePostModal:false,
        createPostLoading:false,
        post:null,
        message:null,
        error:null
    },

    reducers:{
        openCreatePostModal:(state,action)=>{
            state.openCreatePostModal=true
        },
        closeCreatePostModal:(state,action)=>{
            state.openCreatePostModal=false
        },
        createPostRequest:(state,action)=>{
            state.createPostLoading=true;
        },
        createPostSuccess:(state,action)=>{
            state.createPostLoading=false;
            state.message=action.payload.message;
            state.post=action.payload.post
        },
        createPostFailure:(state,action)=>{
            state.createPostLoading=false;
            state.error=action.payload
        },
        clearMessage:(state,action)=>{
            state.message=null
        },
        clearError:(state,action)=>{
            state.error=null
        }
    }
})


export const {closeCreatePostModal,createPostFailure,createPostRequest,createPostSuccess,openCreatePostModal,clearMessage,clearError} = createPost.actions

export default createPost.reducer
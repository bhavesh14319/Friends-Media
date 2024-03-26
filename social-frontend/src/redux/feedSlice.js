import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feedStates",
    initialState:{
        postsLoading:false,
        likeOrCommentLoading:false,
        posts:[],
        usersLoading:false,
        suggestedUsers : [],
        latestPosts : [],
        message:null,
        error:null
    },

    reducers:{
        startPostsLoading:(state,action)=>{
            state.postsLoading=true
        },
        postsSuccess:(state,action)=>{
            state.posts=action.payload
        },
        stopPostsLoading:(state,action)=>{
            state.postsLoading=false
        },
        suggestedUsersRequest:(state,action)=>{
            state.usersLoading=true;
        },
        suggestedUsersSuccess : (state,action)=>{
            state.usersLoading=false;
            state.suggestedUsers=action.payload
        },

        latestPostsSuccess:(state,action)=>{
            state.latestPosts=action.payload
        },
        startLikeOrCommentLoading:(state,action)=>{
            state.likeOrCommentLoading=true
        },
        stopLikeOrCommentLoading:(state,action)=>{
            state.likeOrCommentLoading=false
        },
        likeOrCommentSuccess:(state,action)=>{
            state.message=action.payload
        },
        requestFailure:(state,action)=>{
            state.postsLoading=false;
            state.usersLoading=false;
            state.error=action.payload
        },
        clearMessage:(state,action)=>{
            state.message=null
        },
        clearError :(state,action)=>{
            state.error=null
        }

    }
})


export const {postsSuccess,suggestedUsersSuccess,latestPostsSuccess,likeOrCommentSuccess,clearError,clearMessage,startPostsLoading,stopPostsLoading,startLikeOrCommentLoading,stopLikeOrCommentLoading,requestFailure,suggestedUsersRequest} = feedSlice.actions
export default feedSlice.reducer
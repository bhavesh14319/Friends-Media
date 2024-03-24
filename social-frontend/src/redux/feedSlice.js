import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feedStates",
    initialState:{
        postsLoading:false,
        likeOrCommentLoading:false,
        posts:[],
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
        suggestedUsersSuccess : (state,action)=>{
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
        likeOrCommentFailure:(state,action)=>{
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


export const {postsSuccess,suggestedUsersSuccess,latestPostsSuccess,likeOrCommentFailure,likeOrCommentSuccess,clearError,clearMessage,startPostsLoading,stopPostsLoading,startLikeOrCommentLoading,stopLikeOrCommentLoading} = feedSlice.actions
export default feedSlice.reducer
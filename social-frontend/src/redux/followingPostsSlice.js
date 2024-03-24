
import { createSlice } from "@reduxjs/toolkit";

const followingPostsSlice = createSlice({

    name : "followingPosts",
    initialState:{
        loading:false,
        posts:[],
        errors:null
    },
    reducers:{
    postOfFollowingRequest : (state)=>{
        state.loading=true;
    },

    postOfFollowingSuccess : (state,action)=>{
        state.loading = false;
        state.posts = action.payload;
    },

    postOfFollowingFailure : (state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    clearErrors : (state)=>{
        state.error=null;
    }

    }


})


export const {postOfFollowingRequest,postOfFollowingSuccess,postOfFollowingFailure,clearErrors} = followingPostsSlice.actions

export default followingPostsSlice.reducer
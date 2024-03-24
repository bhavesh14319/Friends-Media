import { createSlice } from "@reduxjs/toolkit";


export const userPostSlice = createSlice({
    name: "userPosts",
    initialState:{
        loading:false,
        posts:[],
        error:null
    },

    reducers:{
    userPostRequest: (state)=>{
        state.loading=true;
    },

    userPostSuccess : (state,action)=>{
        state.loading=false;
        state.posts = action.payload;
    },

    userPostFailure : (state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    clearErrors : (state)=>{
        state.error=null;
    }
    }

})

export const {userPostRequest,userPostSuccess,userPostFailure,clearErrors} = userPostSlice.actions
export default userPostSlice.reducer
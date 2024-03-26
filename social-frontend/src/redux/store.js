import {configureStore} from "@reduxjs/toolkit"



import authReducers from "./AuthSlice"
import feedReducers from "./feedSlice"
import createPostReducers from "./createPostSlice"
import postReducers from "./postSlice"
import userReducers from "./userSlice"
import commentModalReducers from "./commentModalSlice"

const store = configureStore({
    reducer:{
        authStates:authReducers,
        feedStates : feedReducers,
        createPostStates: createPostReducers,
        postStates : postReducers,
        userStates : userReducers,
        commentModalStates : commentModalReducers
    }
})


export default store
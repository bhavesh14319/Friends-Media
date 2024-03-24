import {configureStore} from "@reduxjs/toolkit"



import authReducers from "./AuthSlice"
import feedReducers from "./feedSlice"

const store = configureStore({
    reducer:{
        // user : userReducer,
        // postOfFollowing : followingPostsReducer,
        // allUsers: allUserReducer,
        // userProfile:userProfileReducer,
        // requests:requestReducers,
        // userPosts:userPostReducer,


        authStates:authReducers,
        feedStates : feedReducers
        
    }
})


export default store
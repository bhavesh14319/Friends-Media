import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/user"
import { likeAddCommentDeleteCommentReducer, myPostsReducer, userPostReducer} from "./Reducers/post"


const store = configureStore({
    reducer:{
        user : userReducer,
        postOfFollowing : postOfFollowingReducer,
        allusers: allUsersReducer,
        like:likeAddCommentDeleteCommentReducer,
        myPosts:myPostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostReducer
    }
})


export default store
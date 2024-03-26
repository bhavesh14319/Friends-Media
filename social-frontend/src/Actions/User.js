import axios from "axios"
import {BASE_URL} from "../utils/constants"
import { authFailure, authRequest, authSuccess, logoutSuccess } from "../redux/AuthSlice"
import { latestPostsSuccess, postsSuccess, requestFailure, startPostsLoading, stopPostsLoading, suggestedUsersRequest, suggestedUsersSuccess } from "../redux/feedSlice"
import { userFailure, userRequest, userSuccess } from "../redux/userSlice"
let url=BASE_URL

export const loginUser = async (email, password)=> {
    try {
 
        const res = await axios.post("/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);
        return res.data

      

    } catch (e) {
        console.log(e.response);
        return e.response
  
    }
}



export const registerUser = async (name, email, password, image)  => {
    try {

        const res = await axios.post("/register", { name, email, password, image }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);

  

        console.log(res);
        return res.data

    } catch (e) {
        return e.response
    }
}


export const loadUser = (id)=> async (dispatch) =>  {
    try {
        
        dispatch(authRequest());

        const res = await axios.get("/user", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);
        dispatch(authSuccess(res.data.user))
        return res.data

    } catch (e) {
        console.log(e.response);
        dispatch(authFailure(e.response.data.message))
        return e.response
    }
}


export const logoutUser =()=> async (dispatch) => {
    try {

        dispatch(authRequest());

        const res = await axios.get("/logout", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.removeItem("token");

        dispatch(logoutSuccess());

        return res.data

    } catch (e) {
        dispatch(authFailure(e.response.data.message))
        return e.response
    }
}

export const getFollowingPost =async () => {
    try {

    
        const { data } = await axios.get("/getFollowingPosts", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        return data

   

    } catch (e) {
        return e.response
    }
}

export const getSuggestedUsersData =(name = "")=> async (dispatch) => {
    try {

        dispatch(suggestedUsersRequest())
        const res = await axios.get(`/getSuggestedUsers?name=${name}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })
        // console.log(res.data)
        dispatch(suggestedUsersSuccess(res.data.users))
        return res.data

    } catch (e) {
        dispatch(requestFailure(e.response.data.message))
        return e.response
    }
}


export const getAllUsers =(name = "")=> async (dispatch) => {
    try {
        
        dispatch(suggestedUsersRequest());
        const res = await axios.get(`/users?name=${name}`)
        // console.log(res.data)
        dispatch(suggestedUsersSuccess(res.data.users))
     
    } catch (e) {
        dispatch(requestFailure(e.response.data.message))
        console.log(e.response)
    }
}


export const searchUsers =async (name)=>{
    try {

        const res = await axios.get(`/users?name=${name}`)
        // console.log(res.data)
        return res.data;
     
    } catch (e) {
        return e.response;
    }
}


export const getMyPost =async () => {
    try {


        const res= await axios.get("/user/posts", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        return res.data

   

    } catch (e) {
        return e.response
    }
}

export const updateProfile = (name, email, image) => async (dispatch) => {
    try {

        dispatch({
            type: "updateProfileRequest"
        })

        const res = await axios.put("/update/profile", { name, email, image }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        dispatch({
            type: "updateProfileSuccess",
            payload: res.data
        })

        console.log(res);

    } catch (e) {
        dispatch({
            type: "updateProfileFailure",
            payload: e.response.data.message
        })
    }
}


export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {

        dispatch({
            type: "updatePasswordRequest"
        })

        const res = await axios.put("/update/password", { oldPassword, newPassword }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        dispatch({
            type: "updatePasswordSuccess",
            payload: res.data
        })

        console.log(res);

    } catch (e) {
        dispatch({
            type: "updatePasswordFailure",
            payload: e.response.data.message
        })
    }
}

export const deleteProfile = () => async (dispatch) => {
    try {

        dispatch({
            type: "deleteProfileRequest"
        })

        const res = await axios.delete("/delete/me", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`

            },
            withCredentials: true
        })
        console.log(res);

        dispatch({
            type: "deleteProfileSuccess",
            payload: res.data
        })



    } catch (e) {
        dispatch({
            type: "deleteProfileFailure",
            payload: e.response.data.message
        })
    }

}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest"
        })

        const { data } = await axios.post( "/forgot/password", { email }, {

            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            ,
            withCredentials: true
        })

        console.log(data);
        dispatch({
            type: "forgotPasswordSuccess",
            payload: data
        })

    } catch (e) {
        dispatch({
            type: "forgotPasswordFailure",
            payload: e.response.data.message
        })
    }
}



export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        })

        const { data } = await axios.put(`/password/reset/${token}`, { password }, {

            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

            withCredentials: true
        })

        console.log(data);
        dispatch({
            type: "resetPasswordSuccess",
            payload: data
        })

    } catch (e) {
        dispatch({
            type: "resetPasswordFailure",
            payload: e.response.data.message
        })
    }
}



export const getUserPosts =async (id) => {
    try {

  
        const res = await axios.get(`/user/posts/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        return res.data

    } catch (e) {
       
        return e.response;
    }
}


export const getUserProfile = (id)=> async(dispatch) => {
    try {
        dispatch(userRequest());
        const res = await axios.get( `/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        dispatch(userSuccess(res.data.user))
        return res.data


    } catch (e) {
        dispatch(userFailure())
        return e.response
    }
}



export const followUnfollow = async (id) =>  {
    try {


        const res= await axios.get(`/follow/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })


        return res.data



    } catch (e) {
        
        return e.response
    }
}


export const getFeedData =()=> async(dispatch)=>{
    try{
        dispatch(startPostsLoading())
        const res = await axios.get("/getFeedData");
       
        // console.log(res.data);
        dispatch(postsSuccess(res.data.posts))
        dispatch(stopPostsLoading());

    }catch(e){
        console.log(e.response)
        dispatch(requestFailure(e.response.data.message))
    }
}


export const getUserFeedData = ()=> async(dispatch)=>{
    try{

        dispatch(startPostsLoading())
        const res = await axios.get("/getUserFeed",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });

        // console.log(res.data);
        dispatch(postsSuccess(res.data.posts))
        dispatch(stopPostsLoading());

    }catch(e){

        dispatch(requestFailure(e.response.data.message))
    }
}


export const getLatestPosts =()=> async(dispatch)=>{
    try{

        const res = await axios.get("/getLatestPosts");

        dispatch(latestPostsSuccess(res.data.posts))
        return res.data;

    }catch(e){
        return e.response
    }
}


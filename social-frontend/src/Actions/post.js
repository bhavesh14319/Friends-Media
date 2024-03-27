import axios from "axios";

import { requestFailure, likeOrCommentSuccess, startLikeOrCommentLoading, stopLikeOrCommentLoading } from "../redux/feedSlice";
import { createPostFailure, createPostRequest, createPostSuccess } from "../redux/createPostSlice";
import { postFailure, postRequest, postSuccess } from "../redux/postSlice";


export const getPostData = (id)=> async (dispatch)=>{
    try{
        dispatch(postRequest())
        const res = await axios.get(`/post/${id}`,{
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true 
        });

        dispatch(postSuccess(res.data.post))
        return res.data;

    }catch(e){
        dispatch(postFailure())
        return e.response;
    }
}

export const likePost = (id) => async (dispatch) => {
    try {

        const res = await axios(`/likepost/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        console.log(res.data)
        dispatch(likeOrCommentSuccess(res.data.message))
        return res.data


    } catch (e) {
        dispatch(requestFailure(e.response.data.message))
        return e.response;
    }
}


export const addComment = (id, comment) => async (dispatch) => {
    try {

        dispatch(startLikeOrCommentLoading())
        const { data } = await axios.put(`/post/comment/${id}`, {
            comment,
        }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            ,
            withCredentials: true

        });
        console.log(data);

        dispatch(likeOrCommentSuccess(data.message))
        dispatch(stopLikeOrCommentLoading())

    } catch (e) {
        console.log(e.response)
        dispatch(requestFailure(e.response.data.message))
        dispatch(stopLikeOrCommentLoading())
    }
}



export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {

        console.log(localStorage.getItem('token'))

        const res = await axios.delete( `/post/comment/${postId}`, {
            data: { commentId },
            
            headers: { 
                "Content-Type":"application/json",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }

        )

        dispatch(likeOrCommentSuccess(res.data.message))
    } catch (e) {
        console.log(e.response)
        dispatch(requestFailure(e?.response.data.message))
    }
};


export const createPost = (caption, image)=> async (dispatch) => {
    try {

        dispatch(createPostRequest())

        const res = await axios.post(`/post/upload`, {
            caption, image
        }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        dispatch(createPostSuccess(res.data))
        return res.data

    } catch (e) {
        dispatch(createPostFailure(e.response.data.message))
        dispatch(requestFailure(e.response.data.message))
        return e.response
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deltePostRequest",
        });

        const { data } = await axios.delete(`/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: "deletePostSuccess",
            payload: data.message,
        })

    } catch (e) {
        dispatch({
            type: "deletePostFailure",
            payload: e.response.message
        })
    }
}


export const updatePost = (caption, id) => async (dispatch) => {
    try {
        
        dispatch(postRequest())

        const { data } = await axios.put(`/post/${id}`, {
            caption
        }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        dispatch({
            type: "updatePostSuccess",
            payload: data.message,
        })

    } catch (e) {
        dispatch({
            type: "updatePostFailure",
            payload: e.response.message
        })
    }
}


import axios from "axios";
import { BASE_URL } from "../utils/constants"
import { likeOrCommentFailure, likeOrCommentSuccess, startLikeOrCommentLoading, stopLikeOrCommentLoading } from "../redux/feedSlice";

let url = BASE_URL;

export const likePost = (id) => async (dispatch) => {
    try {

        const res = await axios(`${url}/post/${id}`, {
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
        dispatch(likeOrCommentFailure(e.response.data.message))
        return e.response;
    }
}


export const addComment = (id, comment) => async (dispatch) => {
    try {

        dispatch(startLikeOrCommentLoading())
        const { data } = await axios.put(url + `/post/comment/${id}`, {
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
        dispatch(likeOrCommentFailure(e.response.data.message))
        dispatch(stopLikeOrCommentLoading())
    }
}



export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {

        console.log(localStorage.getItem('token'))

        const res = await axios.delete(url + `/post/comment/${postId}`, {
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
        dispatch(likeOrCommentFailure(e?.response.data.message))
    }
};


export const createPost = async (caption, image) => {
    try {

        console.log(image);

        const res = await axios.post(`${url}api/v1/post/upload`, {
            caption, image
        }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        return res.data

    } catch (e) {

        return e.response
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deltePostRequest",
        });

        const { data } = await axios.delete(`https://bright-hose.cyclic.app/api/v1/post/${id}`, {
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
        dispatch({
            type: "updatePostRequest",
        });

        const { data } = await axios.put(`https://bright-hose.cyclic.app/api/v1/post/${id}`, {
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


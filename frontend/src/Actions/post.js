import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
        console.log(id);
        dispatch({
            type: "likeRequest",
        });

        const { data } = await axios(`https://bright-hose.cyclic.app/api/v1/post/${id}`, { 
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },    
        withCredentials: true });

        console.log(data);
        dispatch({
            type: "likeSuccess",
            payload: data.message,
        })

    } catch (e) {

        dispatch({
            type: "likeFailure",
            payload: e.response.message
        })
    }
}


export const addComment = (id, comment) => async (dispatch) => {
    try {
        console.log(id);
        dispatch({
            type: "commentRequest",
        });

        const { data } = await axios.put(`https://bright-hose.cyclic.app/api/v1/post/comment/${id}`, {
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

        dispatch({
            type: "commentSuccess",
            payload: data.message,
        })

    } catch (e) {
        dispatch({
            type: "commentFailure",
            payload: e.response.message
        })
    }
}



export const deleteComment = (id, commentId) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteCommentRequest",
      });
  
      const { data } = await axios.delete(`https://bright-hose.cyclic.app/api/v1/post/comment/${id}`, {
        data: { commentId },
      },{
        headers:{
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials:true
      });
      dispatch({
        type: "deleteCommentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteCommentFailure",
        payload: error.response.data.message,
      });
    }
  };


export const createPost = (caption, image) => async (dispatch) => {
    try {
        dispatch({
            type: "newPostRequest",
        });
        console.log(image);

        const { data } = await axios.post(`https://bright-hose.cyclic.app/api/v1/post/upload`, {
            caption, image
        }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })

    } catch (e) {
        dispatch({
            type: "newPostFailure",
            payload: e.response.message
        })
    }
}


export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deltePostRequest",
        });

        const { data } = await axios.delete(`https://bright-hose.cyclic.app/api/v1/post/${id}`,{
            headers:{
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


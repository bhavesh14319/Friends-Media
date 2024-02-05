import axios from "axios"

export const loginUser = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: "LoginRequest"
        })

        const res = await axios.post("https://bright-hose.cyclic.app/api/v1/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);

        dispatch({
            type: "LoginSuccess",
            payload: res.data
        })

        console.log(res);

    } catch (e) {
        console.log(e.response);
        dispatch({
            type: "LoginFailure",
            payload: e.response.data.message
        })
    }
}



export const registerUser = (name, email, password, image) => async (dispatch) => {
    try {

        dispatch({
            type: "RegisterRequest"
        })

        const res = await axios.post("https://bright-hose.cyclic.app/api/v1/register", { name, email, password, image }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);

        dispatch({
            type: "RegisterSuccess",
            payload: res.data
        })

        console.log(res);

    } catch (e) {
        dispatch({
            type: "RegisterFailure",
            payload: e.response.data.message
        })
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });

        const res = await axios.get("https://bright-hose.cyclic.app/api/v1/user", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.setItem("token", res.data.token);




        dispatch({
            type: "LoginSuccess",
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: "LoginFailure",
            payload: e.response.data.message
        })
    }
}


export const logoutUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "logoutUserRequest"
        })


        const res = await axios.get("https://bright-hose.cyclic.app/api/v1/logout", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        localStorage.removeItem("token");

        dispatch({
            type: "logoutUserSuccess",
        })

        console.log(res);

    } catch (e) {
        dispatch({
            type: "logoutUserFailure",
            payload: e.response.data.message
        })
    }
}

export const getFollowingPost = () => async (dispatch) => {
    try {

        dispatch({
            type: "postOfFollowingRequest",
        })
    

        const { data } = await axios.get("https://bright-hose.cyclic.app/api/v1/getFollowingPosts", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })

    } catch (e) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: e.response.data.message
        })
    }
}



export const getAllUsers = (name = "") => async (dispatch) => {
    try {

        dispatch({
            type: "allUsersRequest",
        })

        const { data } = await axios.get(`https://bright-hose.cyclic.app/api/v1/users?name=${name}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        dispatch({
            type: "allUsersSuccess",
            payload: data.users
        })

    } catch (e) {
        dispatch({
            type: "allUsersFailure",
            payload: e.response.data.message
        })
    }
}


export const getMyPost = () => async (dispatch) => {
    try {

        dispatch({
            type: "myPostsRequest",
        })

        const { data } = await axios.get("https://bright-hose.cyclic.app/api/v1/user/posts", {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        dispatch({
            type: "myPostsSuccess",
            payload: data.posts
        })

    } catch (e) {
        dispatch({
            type: "myPostsFailure",
            payload: e.response.data.message
        })
    }
}

export const updateProfile = (name, email, image) => async (dispatch) => {
    try {

        dispatch({
            type: "updateProfileRequest"
        })

        const res = await axios.put("https://bright-hose.cyclic.app/api/v1/update/profile", { name, email, image }, {
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

        const res = await axios.put("https://bright-hose.cyclic.app/api/v1/update/password", { oldPassword, newPassword }, {
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

        const res = await axios.delete("https://bright-hose.cyclic.app/api/v1/delete/me", {
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

        const { data } = await axios.post("https://bright-hose.cyclic.app/api/v1/forgot/password", { email }, {

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

        const { data } = await axios.put(`https://bright-hose.cyclic.app/api/v1/password/reset/${token}`, { password }, {

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



export const getUserPosts = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "userPostRequest",
        })

        const { data } = await axios.get(`https://bright-hose.cyclic.app/api/v1/user/posts/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        dispatch({
            type: "userPostSuccess",
            payload: data.posts
        })

    } catch (e) {
        dispatch({
            type: "userPostFailure",
            payload: e.response.data.message
        })
    }
}


export const getUserProfile = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "userProfileRequest",
        })

        const { data } = await axios.get(`https://bright-hose.cyclic.app/api/v1/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        dispatch({
            type: "userProfileSuccess",
            payload: data.user
        })

    } catch (e) {
        dispatch({
            type: "userProfileFailure",
            payload: e.response.data.message
        })
    }
}



export const followUnfollow = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "followUserRequest",
        })

        const { data } = await axios.get(`https://bright-hose.cyclic.app/api/v1/follow/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        })

        console.log(data);

        dispatch({
            type: "followUserSuccess",
            payload: data.message
        })

    } catch (e) {
        dispatch({
            type: "followUserFailure",
            payload: e.response.data.message
        })
    }
}
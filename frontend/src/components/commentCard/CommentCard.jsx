import React, { useEffect } from 'react'
import "./commentCard.css"
import { Link, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../Actions/post'
import { getFollowingPost, getMyPost, getUserPosts } from '../../Actions/User'
import { useAlert } from 'react-alert'

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount=false,
    isDelete=false,
    page

}) => {


    const { user } = useSelector((state) => state.user);

    const{error, message} = useSelector((state)=>state.like);

    const alert = useAlert();


    const dispatch = useDispatch();
    const params = useParams();

    const handleDelete = async () =>{
       await dispatch(deleteComment(postId,commentId));

        if (isAccount) {
            dispatch(getMyPost())
        } else if(page==="userProfile"){
            dispatch(getUserPosts(params.id));
        } else{
            dispatch(getFollowingPost())
        }
    }




    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({
                type:"clearErrors"
            })
        }
        if(message){
            alert.success(message);
            dispatch({
                type:"clearMessage"
            })
        }
    },[error,dispatch,message,alert]);



    return (
        <div className="commentUser">
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>
            <Typography>{comment}</Typography>

            {isAccount ?
                <Button onClick={handleDelete}>
                    <Delete />
                </Button>
                :
                userId === user.user._id ?
                    <Button onClick={handleDelete}>
                        <Delete />
                    </Button>
                :
                null
            }

        </div>
    )
}
export default CommentCard

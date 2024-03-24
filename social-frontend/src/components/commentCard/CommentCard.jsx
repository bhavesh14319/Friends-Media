import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../Actions/post'
import {  getUserFeedData } from '../../Actions/User'

import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'


const CommentCard = ({
    comment,
    postId,
    ownerId,
    isAccount,
    page
}) => {



    const {authorizedUser:user} = useSelector((state)=>state.authStates);



    const dispatch = useDispatch();



    // who can delete comment?
    // one who makes it
    // one whose post is this?
    // isPostOwner? post.owner._id === user._id
    // isCommentOwner? comment.user._id === user._id
    const handleDelete = async () => {
        await dispatch(deleteComment(postId,comment._id));

        if(isAccount){
            // load posts of logged in user

        }else if(page === "userProfile"){

        }else{ //isAccount
            dispatch(getUserFeedData())
        }
        
        // else if (page === "userProfile") {
        //     dispatch(getUserPosts(params.id));
        // } else {
        //     dispatch(getFollowingPost())
        // }
    }

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={comment?.user?.avatar?.url} />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.user.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', marginRight:"10px" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                               {comment.comment}
                            </Typography>
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </React.Fragment>
                    }
                />
             {
                (user?._id === comment?.user?._id || ownerId === user?._id) && <IconButton onClick={handleDelete}> <Delete sx={{color:"red"}}/> </IconButton>
             }
                
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}
export default CommentCard

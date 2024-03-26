import React, { useEffect, useState } from 'react'

// import { Link, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../Actions/post'
import { getUserFeedData } from '../../Actions/User'





// mui
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Stack, IconButton, Typography, Menu, MenuItem } from '@mui/material'
import { Favorite, MoreVert, ChatBubbleOutlineRounded, ChatBubble } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { openAuthModal } from '../../redux/AuthSlice'
import { clearError, clearMessage } from '../../redux/feedSlice'
import CommentModal from '../Modal/CommentModal'
import LikesFollowersFollowingModal from '../Modal/LikesFollowersFollowingModal'
import { Link } from 'react-router-dom'


const Post = ({
    postId,
    caption,
    postImage,
    likes,
    comments,
    owner,
    isDelete = false,
    isAccount = false,
    page
}) => {

    const { isAuthenticated, authorizedUser: user } = useSelector((state) => state.authStates)
    const { message, error } = useSelector((state) => state.feedStates)

    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [openLikesModal, setOpenLikesModal] = useState(false);


   


    const handleLike = async () => {

        if (isAuthenticated) {
            await dispatch(likePost(postId))
            await dispatch(getUserFeedData())
            setLiked(!liked);
        } else {
            Swal.fire({
                title: "Please Login First",
                text: "Note: dummy login credentials are provided",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(openAuthModal())
                }
            });
        }

    }




    const handleExpandClick = (e) => {

        setOpen(!open);
    };




    useEffect(() => {
        // console.log(likes);
        if (likes.length > 0) {
            likes.map((userWhoLiked) => {
                if (String(userWhoLiked?._id) === String(user?._id)) {
                    // console.log("true")
                    setLiked(true);
                }
                return ""
            })
        }
    }, [likes, user?._id])


    useEffect(() => {
        if (message) {
            Swal.fire({
                icon: "success",
                title: message + " 😃",
                toast: true,
                position: "bottom",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                dispatch(clearMessage())
            })
        }

        if (error) {
            Swal.fire({
                icon: "error",
                title: error + " 😥",
                toast: true,
                position: "bottom",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                dispatch(clearError())
            })
        }
    }, [message, error, dispatch])


    return (

        <>
            <Card sx={{ marginBottom: "20px", marginLeft: "0" }}>
                <Link to={`/profile/${owner._id}`}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{}} aria-label="recipe" src={owner.avatar.url} />
                        }
                        action={
                            user?._id === owner?._id &&
                            <IconButton  aria-label="settings">
                                <MoreVert />
                            </IconButton>

                        }
                        title={owner.name}
                        subheader="September 14, 2016"
                    />
                </Link>
                <CardMedia
                    component="img"
                    height=""
                    sx={{ maxHeight: "400px", overflow: "hidden", objectFit: "cover", objectPosition: "center" }}
                    image={postImage}
                    alt="Post Image"
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {caption}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <Stack direction="row">
                        <IconButton onClick={handleLike} aria-label="add to favorites">
                            <Favorite sx={{ color: liked ? "Red" : "#707070" }} />
                        </IconButton>
                        <IconButton aria-label="share" onClick={handleExpandClick}>
                            {open ? <ChatBubble /> : <ChatBubbleOutlineRounded />}
                        </IconButton>
                    </Stack>
                    <Button onClick={() => setOpenLikesModal(true)}><Typography sx={{ textTransform: "lowercase" }}>{likes.length}  Likes </Typography></Button>
                </CardActions>



            </Card>

            



            {/* comment modal */}
            <CommentModal
                open={open}
                setOpen={setOpen}
                owner={owner}
                comments={comments}
                postId={postId}
                postImage={postImage}

            />

            {/* Likes Modal */}
            <LikesFollowersFollowingModal
                title="Likes"
                open={openLikesModal}
                setOpen={setOpenLikesModal}
                data={likes}
            />

        </>
    )
}

export default Post

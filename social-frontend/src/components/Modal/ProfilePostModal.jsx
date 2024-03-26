import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, ListItemIcon, Menu, MenuItem, Modal, Stack, Typography } from '@mui/material'
import { ChatBubble, ChatBubbleOutlineRounded, Delete, Favorite, MoreVert } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { getUserFeedData, loadUser } from '../../Actions/User'
import { deletePost, getPostData, likePost } from '../../Actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthModal } from '../../redux/AuthSlice'
import { clearError, clearMessage } from '../../redux/feedSlice'
import CommentModal from './CommentModal'
import LikesModal from './LikesFollowersFollowingModal'
import PostShimmer from '../Shimmer/PostShimmer'
import LikesFollowersFollowingModal from './LikesFollowersFollowingModal'
import UpdateIcon from '@mui/icons-material/Update';
import UpdatePostModal from './UpdatePostModal'

const ProfilePostModal = ({ openProfilePostModal, setOpenProfilePostModal, postId }) => {

    console.log(postId);
    const { loading, post } = useSelector((state) => state.postStates);

    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [openLikesModal, setOpenLikesModal] = useState(false);
    const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);

    const { message, error } = useSelector((state) => state.feedStates)
    const { isAuthenticated, authorizedUser: user } = useSelector((state) => state.authStates)
    const [menuAnchor,setMenuAnchor] = useState();
    const [openMenu , setOpenMenu] = useState(false);
    const dispatch = useDispatch();



    const getPost = async () => {

        dispatch(getPostData(postId));

    }

    useEffect(() => {
        getPost();

    }, [postId])


    const handleLike = async () => {

        if (isAuthenticated) {
            await dispatch(likePost(postId));
            await dispatch(getUserFeedData())
            await dispatch(getPostData(postId))

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


    const handleMenuClick = (e)=>{
        setMenuAnchor(e.target)
        setOpenMenu(!openMenu);

    }


    const handleExpandClick = () => {
        setOpen(!open);
    };


    const handleUpdatePost = ()=>{
        setOpenMenu(!openMenu)
        setOpenUpdatePostModal(true)
    }

    const handleDelete = async()=>{
       await dispatch(deletePost(postId));
       await dispatch(loadUser())
       setOpenMenu(!openMenu);
       setOpenProfilePostModal(!openProfilePostModal)
    }



    useEffect(() => {
        // console.log(likes);
        if (post?.likes?.length > 0) {
            post?.likes.map((userWhoLiked) => {
                if (String(userWhoLiked?._id) === String(user?._id)) {
                    console.log("true")
                    setLiked(true);
                }
                return ""
            })
        }
    }, [post?.likes, user?._id])


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
            <Modal
                open={openProfilePostModal}
                onClose={() => setOpenProfilePostModal(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}

            >
                {loading ?
                    (
                        <Box sx={{ minWidth: {xs:  "90%", sm:"50%" },  display: "flex" }}>
                           <PostShimmer />
                        </Box>
                    )
                    :
                    (
                        <Box sx={{ minWidth: {xs:  "90%", sm:"50%" }, m: "20px",  display: "flex" }}>
                            <Card sx={{ width: "100%", marginBottom: "20px", marginLeft: "0" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{}} aria-label="recipe" src={post?.owner?.avatar.url} />
                                    }
                                    action={
                                        user?._id === post?.owner?._id &&
                                        <IconButton onClick={handleMenuClick} aria-label="settings">
                                            <MoreVert />
                                        </IconButton>

                                    }
                                    title={post?.owner?.name}
                                    subheader="September 14, 2016"
                                />
                                <CardMedia
                                    component="img"
                                    height=""
                                    sx={{ background: "#f2f2f2", maxHeight: "400px", overflow: "hidden", objectFit: "contain", objectPosition: "center" }}
                                    image={post?.image?.url}
                                    alt="Post Image"
                                />

                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {post?.caption}
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
                                    <Button onClick={() => setOpenLikesModal(true)}><Typography sx={{ textTransform: "lowercase" }}>{post?.likes?.length}  Likes </Typography></Button>
                                </CardActions>



                            </Card>
                        </Box>

                    )

                }






            </Modal>

            <Menu
                id="basic-menu"
                anchorEl={menuAnchor}
                open={openMenu}
                onClose={()=>setOpenMenu(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDelete} > Delete Post <ListItemIcon sx={{marginLeft:"15px"}}><Delete/> </ListItemIcon></MenuItem>
                <MenuItem  onClick={handleUpdatePost} >Update Post <ListItemIcon sx={{marginLeft:"10px"}}> <UpdateIcon /> </ListItemIcon></MenuItem>
            </Menu>
            {post &&

                <>

                    <UpdatePostModal
                        postId={post?._id}
                        openUpdatePostModal={openUpdatePostModal}
                        setOpenUpdatePostModal={setOpenUpdatePostModal}    

                    />

                    <LikesFollowersFollowingModal
                        data={post?.likes}
                        title={"Likes"}
                        open={openLikesModal}
                        setOpen={setOpenLikesModal}
                    />

                    <CommentModal
                        comments={post?.comments}
                        open={open}
                        owner={post?.owner}
                        postId={post?._id}
                        postImage={post?.image?.url}
                        setOpen={setOpen}

                    />
                </>
            }
        </>
    )
}

export default ProfilePostModal

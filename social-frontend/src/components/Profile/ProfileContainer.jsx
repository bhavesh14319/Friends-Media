import { Avatar, Box, Button, CircularProgress, Divider, ImageList, ImageListItem,  Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  followUnfollow, getUserProfile, loadUser } from '../../Actions/User';
import ProfilePostModal from '../Modal/ProfilePostModal';
import ProfileShimmer from '../Shimmer/ProfileShimmer';
import LikesFollowersFollowingModal from '../Modal/LikesFollowersFollowingModal';
import Swal from 'sweetalert2';




const ProfileContainer = () => {
    const xs = useMediaQuery('(max-width:600px)');
    const sm = useMediaQuery('(max-width:900px)');
    const md = useMediaQuery('(min-width:900px)');

    const dispatch = useDispatch();

    const params = useParams();

    const { user: profileUser, loading } = useSelector((state) => (state.userStates))
    const [openProfilePostModal, setOpenProfilePostModal] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");

    const [modalData, setModalData] = useState([])


    const [processing, setProcessing] = useState(false);



    const [followed, setFollowed] = useState(false)


    const handleFollowers = () => {

        setModalTitle("Followers")
        setModalData(profileUser?.followers)
        setOpenModal(true);
    }

    const handleFollowing = () => {
        setModalTitle("Followings");
        setModalData(profileUser?.following)
        setOpenModal(true)
    }

    const handlePostClick = (post) => {
        setActivePost(post);
        setOpenProfilePostModal(true);
    }




    const handleFollow = async () => {
        setProcessing(true);
        const res = await followUnfollow(profileUser?._id);
        await dispatch(loadUser(dispatch))

        if (res.success) {
            Swal.fire({
                icon: "success",
                title: res.message + " 😃",
                toast: true,
                position: "bottom",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setFollowed(!followed)
                setProcessing(false);
            })
        }
    }






    useEffect(() => {
        dispatch(getUserProfile(params.id));
    }, [dispatch,params.id])






    return (
        <Box flexGrow={{ xs: 1, sm: 2, md: 4 }} sx={{  maxWidth: { xs: "100%", sm: "70%", md: "78.5%" }, borderRight: "1px solid #707070", marginLeft: "0px !important", padding: { xs: "1em 0", md: "2em 1em", lg: "2em 2em" } }} marginLeft={0}>

            {loading ?
                <ProfileShimmer />

                :

                <Box position={"relative"} sx={{  margin: { sm: "0 auto" }, padding: "1em" }}>

                    {/* <IconButton onClick={handleMenuClick} sx={{ position: "absolute", right: "0", top: "0" }}><Settings fontSize='large' /></IconButton> */}
                    <Stack direction="row" alignItems="center">
                        <Avatar src={profileUser?.avatar?.url} sx={{ width: { xs: "100px", sm: "150px" }, height: { xs: "100px", sm: "150px" } }} />
                        <Box sx={{ width: "100%", marginLeft: { xs: "50px", sm: "50px", md: "100px" } }}>

                            <Stack position="relative" direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent={{ xs: "flex-end", sm: "flex-start" }} width="100%" sx={{ marginBottom: { sm: "20px" } }}>
                                <Typography variant='h6' sx={{marginRight: "30px"}}> {profileUser?.name}</Typography>
                                <Button variant='contained' onClick={handleFollow} sx={{ maxWidth: "150px", minWidth: "100px" }}>{processing ? <CircularProgress size={18} sx={{ color: "white", paddingY: "2px" }} /> : <>{followed ? "unfollow" : "follow"}</>}</Button>
                            </Stack>
                            <Stack sx={{ display: { xs: "none", md: "flex" } }} direction="row" flexWrap="wrap">
                                <Button variant='text'>{profileUser?.posts?.length} Posts</Button>
                                <Button onClick={handleFollowers} variant='text'>{profileUser?.followers?.length} Followers</Button>
                                <Button onClick={handleFollowing} variant='text'>{profileUser?.following?.length} Following</Button>
                            </Stack>
                        </Box >


                    </Stack>

                    <Stack sx={{ display: { xs: "flex", md: "none", margin: "20px 0" } }} direction="row" flexWrap="wrap" justifyContent="space-around">
                        <Button variant='text'>{profileUser?.posts?.length} Posts</Button>
                        <Button onClick={handleFollowers} variant='text'>{profileUser?.followers?.length} Followers</Button>
                        <Button onClick={handleFollowing} variant='text'>{profileUser?.following?.length} Following</Button>
                    </Stack>


                    <Divider sx={{ margin: "20px 0" }} />

                    <Typography variant='h6' sx={{ marginBottom: "10px" }}>Posts</Typography>


                    {profileUser?.posts?.length===0 && 

                        <Typography textAlign={"center"} variant='h6' sx={{ marginBottom: "10px" }}>User does not have posts... 😥</Typography>
                    
                    }

                    {profileUser?.posts?.length > 0 &&
                        <ImageList rowHeight={xs ? 120 : sm ? 164 : md ? 250 : 300} gap={xs ? 10 : md ? 15 : 10} cols={3} >
                            {profileUser?.posts?.map((post) => (
                                <ImageListItem sx={{ cursor: "pointer" }} key={post._id} onClick={() => handlePostClick(post)}>
                                    <img
                                        src={post.image.url}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        alt="post"
                                    >
                                    </img>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    }

                </Box>




            }


            {/* <Menu
                id="basic-menu"
                anchorEl={menuAnchor}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleDeleteAccount}> {deleteAccountProcessing? "Deleting..." :  "Delete Account" }</MenuItem>
            </Menu> */}

            <LikesFollowersFollowingModal
                open={openModal}
                setOpen={setOpenModal}
                data={modalData}
                title={modalTitle}
            />


            {activePost?._id &&
                <ProfilePostModal
                    postId={activePost?._id}
                    openProfilePostModal={openProfilePostModal}
                    setOpenProfilePostModal={setOpenProfilePostModal}
                />
            }
        </Box>
    )
}

export default ProfileContainer

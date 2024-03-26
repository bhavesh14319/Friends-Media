import { Avatar, Box, Button, Divider, IconButton, ImageList, ImageListItem, Menu, MenuItem, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser } from '../../Actions/User';
import ProfilePostModal from '../Modal/ProfilePostModal';
import { clearUser } from '../../redux/userSlice';
import ProfileShimmer from '../Shimmer/ProfileShimmer';
import LikesFollowersFollowingModal from '../Modal/LikesFollowersFollowingModal';
import { Settings } from '@mui/icons-material';
import Swal from 'sweetalert2';




const ProfileContainer = () => {
    const xs = useMediaQuery('(max-width:600px)');
    const sm = useMediaQuery('(max-width:900px)');
    const md = useMediaQuery('(min-width:900px)');

    const dispatch = useDispatch();
    const { authorizedUser: user } = useSelector((state) => state.authStates);
    const params = useParams();

    // const [profileUser, setProfileUser] = useState(null);

    const { user: profileUser, loading } = useSelector((state) => (state.userStates))

    const [isAccount, setIsAccount] = useState(String(user?._id) === String(params.id));

    const [openProfilePostModal, setOpenProfilePostModal] = useState(false);
    const [activePost, setActivePost] = useState(null);

    const [openModal, setOpenModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");

    const [modalData, setModalData] = useState([])

    const [menuAnchor, setMenuAnchor] = useState();
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

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



    console.log(params);


    const loadProfileUser = async () => {

        dispatch(getUserProfile(params.id));


    }

    const handlePostClick = (post) => {
        console.log(post)
        setActivePost(post);
        setOpenProfilePostModal(true);
    }


    const handleMenuClick = (e) => {
        setMenuAnchor(e.target)
        setOpenMenu(!openMenu);

    }

    const handleLogout = async ()=>{
        Swal.fire({
            icon:"info",
            title:"Are you sure?",
            confirmButtonText:"Logout",
            showCancelButton:"true",
        }).then((result)=>{
            if(result.isConfirmed){
                setOpenMenu(false);
                dispatch(logoutUser());
                Swal.fire({
                    icon: "success",
                    title: "Logged out Successfully...",
                    toast: true,
                    position: "bottom",
                    showConfirmButton: false,
                    timer: 1500
                  })
                navigate("/")

            }
        })
    }


    useEffect(() => {
        if (String(user?._id) === String(params.id)) {
            setIsAccount(true);
        } else {
            setIsAccount(false);
        }
        loadProfileUser();
    }, [user?._id, params.id])






    return (
        <Box flexGrow={{ xs: 1, sm: 2, md: 4 }} sx={{ maxWidth: { xs: "100%", sm: "70%", md: "78.5%" }, borderRight: "1px solid #707070", marginLeft: "0px !important", padding: { xs: "1em 0", md: "2em 1em", lg: "2em 2em" } }} marginLeft={0}>

            {loading ?
                <ProfileShimmer />

                :

                <Box position={"relative"} sx={{ margin: { sm: "0 auto" }, padding: "1em" }}>

                    <IconButton onClick={handleMenuClick} sx={{ position: "absolute", right: "0", top: "0" }}><Settings fontSize='large' /></IconButton>
                    <Stack direction="row" alignItems="center">
                        <Avatar src={profileUser?.avatar?.url} sx={{ width: { xs: "100px", sm: "150px" }, height: { xs: "100px", sm: "150px" } }} />
                        <Box sx={{ width: "100%", marginLeft: { xs: "50px", sm: "50px", md: "100px" } }}>

                            <Stack position="relative" direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent={{ xs: "flex-end", sm: "flex-start" }} width="100%" sx={{ marginBottom: { sm: "20px" } }}>
                                <Typography sx={{ marginRight: "30px" }}>{profileUser?.name}</Typography>
                                {!isAccount && <Button variant='contained' sx={{ maxWidth: "150px" }}>Follow</Button>}
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


                    {/* <Stack direction="row" flexWrap="wrap" sx={{margin :"0 auto", width:"100%"}}>                    
                    {posts.map((post)=>(
                        <Box sx={{ minWidth:"300px",  maxWidth:"400px", maxHeight:"400px", margin:"15px"}}>
                            <img 
                                src={post.image.url}
                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                            />
                        </Box>
                    ))}

                
                </Stack> */}
                    {/* cols={xs? 2 : sm ? 3: 4} sx={{overflow:"visible"}}  */}
                    <ImageList rowHeight={xs ? 120 : sm ? 164 : md ? 250 : 300} gap={xs ? 10 : md ? 15 : 10} cols={3} >
                        {profileUser?.posts?.map((post) => (
                            <ImageListItem sx={{cursor:"pointer"}} key={post._id} onClick={() => handlePostClick(post)}>
                                <img
                                    src={post.image.url}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                >
                                </img>
                            </ImageListItem>
                        ))}
                    </ImageList>

                </Box>




            }


            <Menu
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
                <MenuItem >Delete Account</MenuItem>
            </Menu>

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

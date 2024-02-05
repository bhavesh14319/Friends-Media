import React, { useEffect, useState } from 'react'
import "./Account.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getMyPost, logoutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../User/User';
import { useAlert } from 'react-alert';

import SettingsIcon from '@mui/icons-material/Settings';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Account = () => {

    const dispatch = useDispatch();
    let { user, loading: userLoading } = useSelector((state) => state.user)
    const { loading, error, posts, } = useSelector((state) => state.myPosts)
    const { error: likeError, message, loading: deleteLoading } = useSelector((state) => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);

    const alert = useAlert();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logoutUser())

        alert.success("Logged out successfully")
    }

    const handleDeleteProfile = async () => {
        await dispatch(deleteProfile());
        dispatch(logoutUser());
    }


    useEffect(() => {
        if (likeError) {
            alert.error(likeError);
            dispatch({
                type: "clearErrors"
            })
        }

        if (message) {
            console.log(message);
            alert.success(message.message)
            dispatch({
                type: "clearMessage"
            })
        }


    }, [alert, error, likeError, message, dispatch])


    useEffect(() => {
        dispatch(getMyPost());
    }, [dispatch])
    return (
        <>
            {loading || userLoading ? <Loader /> :

                <div className='account'>
                    <div className="accountleft">
                        {
                            posts && posts.length > 0 ?

                                posts.map((post) => (
                                    <Post
                                        key={post._id}
                                        postId={post._id}
                                        caption={post.caption}
                                        postImage={post.image.url}
                                        likes={post.likes}
                                        comments={post.comments}
                                        ownerImage={post.owner.avatar.url}
                                        ownerName={post.owner.name}
                                        ownerId={post.owner._id}
                                        isAccount={true}
                                        isDelete={true}
                                    />
                                ))

                                :

                                <Typography variant='h6'>You have not made any posts</Typography>
                        }


                    </div>
                    <div className="accountright">


                        <div className='avatarName'>
                            <Avatar src={user?.user?.avatar?.url}
                                sx={{ height: "8vmax", width: "8vmax" }}
                            />


                            <Typography variant="h5"  >{user.user.name}</Typography>
                        </div>

                        <div className='btnsCont'>
                            <div className='btns'>

                                <Typography>Posts </Typography>

                                <Typography>{user.user.posts.length} </Typography>
                            </div>

                            <div className='btns'>
                                <button onClick={() => setFollowersToggle(!followersToggle)}>
                                    <Typography>followers </Typography>
                                </button>
                                <Typography>{user.user.followers.length} </Typography>
                            </div>

                            <div className='btns'>
                                <button onClick={() => setFollowingToggle(!followingToggle)}>
                                    <Typography>following </Typography>
                                </button>
                                <Typography>{user.user.following.length} </Typography>
                            </div>

                        </div>
                        <div className='settingsIcon'>
                            <SettingsIcon onClick={handleClick} />
                        </div>

                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem className='menuItem' onClick={handleClose}>
                                <Link to="/update/profile">Edit Profile</Link>
                            </MenuItem>
                            <MenuItem className='menuItem' onClick={handleClose}>
                                <Link to="/update/password"><Button variant="text" disabled={deleteLoading} onClick={handleDeleteProfile} style={{ color: "red"}}>Delete My Profile</Button>
                                </Link>
                            </MenuItem>
                            <MenuItem className='menuItem' onClick={handleClose}>
                                <Button variant="contained" onClick={handleLogout}>Logout</Button>
                            </MenuItem>

                        </Menu>
















                        <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                            <div className="DialogBox">
                                <Typography> Followed By </Typography>

                                {
                                    user.user && user.user.followers.length > 0 ?
                                        user.user.followers?.map((follower) => (
                                            <User
                                                key={follower?._id}
                                                id={follower?._id}
                                                name={follower.name}
                                                avatar={follower.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                                            />
                                        ))

                                        :
                                        <Typography style={{ margin: "2vmax" }}>You have no followers yet</Typography>

                                }
                            </div>
                        </Dialog>


                        <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                            <div className="DialogBox">
                                <Typography> Following </Typography>

                                {
                                    user.user && user.user.following.length > 0 ?
                                        user.user.following?.map((follow) => (
                                            <User
                                                key={follow?._id}
                                                id={follow?._id}
                                                name={follow.name}
                                                avatar={follow.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                                            />
                                        ))

                                        :
                                        <Typography style={{ margin: "2vmax" }}> You have not followed anyone</Typography>

                                }
                            </div>
                        </Dialog>

                    </div>

                </div>


            }



        </>
    )
}

export default Account

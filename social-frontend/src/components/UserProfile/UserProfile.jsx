import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUnfollow, getUserPosts, getUserProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Dialog, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import User from '../User/ListUser';


import {userPostRequest,userPostSuccess,userPostFailure} from "../../redux/userPostsSlice"
import {userProfileRequest,userProfileSuccess,userProfileFailure,clearErrors} from "../../redux/userProfileSlice"

const UserProfile = () => {
    const params = useParams();


    const dispatch = useDispatch();
    const { user: me } = useSelector((state) => state.user);
    const { user, loading: userLoading, error:userError } = useSelector((state) => state.userProfile);
    const { loading, error, posts, } = useSelector((state) => state.userPosts)
    const { error: followError, message , loading:followLoading} = useSelector((state) => state.requests);

    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);

    const [following, setFollowing] = useState(false);

    const [myProfile, setMyProfile] = useState(false);


    const getPosts = async  (id)=>{
        dispatch(userPostRequest());

        const res=  await getUserPosts(id);

        if(res.success){
            dispatch(userPostSuccess(res.posts))
        }else{
            dispatch(userPostFailure(res.data.message))
        }

    }


    const getProfile = async (id)=>{
        dispatch(userProfileRequest());

        const res = await getUserProfile(id);
        console.log(res)
        if(res.success){
            dispatch(userProfileSuccess(res.user))
        }else{
            dispatch(userProfileFailure(res?.data?.message))
        }
    }
    


    const followHandler = async (e) => {

        await dispatch(followUnfollow(user._id));
        await dispatch(getUserProfile(params.id));
        setFollowing(!following);
        
    }




    useEffect(() => {
        if (followError) {
           
            dispatch({
                type: "clearErrors"
            })
        }

        if (userError) {
            
            dispatch({
                type: "clearErrors"
            })
        }

        if (message) {
            
            
            dispatch({
                type: "clearMessage"
            })
        }

    }, [ error, userError,followError, message, dispatch])


    useEffect(() => {

        getPosts(params.id);
        getProfile(params.id);
        // dispatch(getUserPosts(params.id));

        // dispatch(getUserProfile(params.id));

 

       

    }, [params.id])


    useEffect(()=>{
        if (me?._id === params.id) {
            setMyProfile(true);
        }

        if(user){
            user.followers.forEach((item)=>{
                console.log(item);
                if(item._id===me._id){
                    console.log(true);
                    setFollowing(true);
                }else{
                    setFollowing(false);
                }
            })
        }
    },[me?._id,params.id,following]);
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
                                        page="userProfile"
                                    />
                                ))

                                :

                                <Typography variant='h6'>User have not made any posts</Typography>
                        }


                    </div>


                    <div className="accountright">

                        {user &&
                            <>

                            <div className='avatarName'>

                                <Avatar src={user?.avatar?.url}
                                    sx={{ height: "8vmax", width: "8vmax" }}
                                />


                                <Typography variant="h5">{user.name}</Typography>
                                </div>

                                <div className='btnsCont'>

                                <div className='btns'>
                                    <button onClick={() => setFollowersToggle(!followersToggle)}>
                                        <Typography>followers </Typography>
                                    </button>
                                    <Typography>{user?.followers.length} </Typography>
                                </div>

                                <div className='btns'>
                                    <button onClick={() => setFollowingToggle(!followingToggle)}>
                                        <Typography>following </Typography>
                                    </button>
                                    <Typography>{user?.following.length} </Typography>
                                </div>


                                <div className='btns'>

                                    <Typography>Posts </Typography>

                                    <Typography>{user.posts.length} </Typography>
                                </div>

                                </div>

                                
                                <div className='followBtn'>
                                {myProfile ? null : <button disabled={followLoading} onClick={followHandler} > {following ? "Unfollow" : "follow"}</button>}
                                </div>


                            </>


                        }











                        <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                            <div className="DialogBox">
                                <Typography> Followed By </Typography>
            
                                {
                                    user && user.followers.length > 0 ?
                                        user.followers?.map((follower) => (
                                            <User
                                                key={follower._id}
                                                id={follower._id}
                                                name={follower.name}
                                                avatar={follower?.avatar?.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
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
                                    user && user.following.length > 0 ?
                                        user.following?.map((follow) => (
                                            <User
                                                key={follow._id}
                                                id={follow._id}
                                                name={follow.name}
                                                avatar={follow.avatar?.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
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

export default UserProfile

import React, { useEffect } from 'react'
import "./Home.css"
import User from '../User/User'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getAllUsers, getFollowingPost } from '../../Actions/User'

import Loader from "../Loader/Loader";
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import Diversity1Icon from '@mui/icons-material/Diversity1';

const Home = () => {

    const { users, loading: userLoading } = useSelector((state) => state.allusers);
    const dispatch = useDispatch();
    const { loading, posts, error } = useSelector((state) => state.postOfFollowing);

    const { error: likeError, message } = useSelector((state) => state.like);

    const alert = useAlert();
    useEffect(() => {
        dispatch(getFollowingPost());
        dispatch(getAllUsers())
    }, [dispatch])

    const toggleList = () => {
        let x = document.getElementById("smHomeRight");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        console.log(x.style.display);
    }


    useEffect(() => {
        if (likeError) {
            alert.error(likeError);
            dispatch({
                type: "clearErrors"
            })
        }

        if (message) {
            alert.success(message)
            dispatch({
                type: "clearMessage"
            })
        }

    }, [alert, error, likeError, message, dispatch])

    return (
        <>
            {loading ? <Loader /> :

                <div className='home'>
                    <div className='homeLeft'>

                        {
                            posts && posts.length > 0 ?

                                posts?.map((post) => (
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



                                    />
                                ))

                                :

                                <Typography variant='h6'>No Posts Yet</Typography>
                        }

                    </div>
                    <div className='homeRight'>

                        {userLoading ? <Loader /> : <>

                            {users && users.length > 0 ?

                                users?.map((user) => (
                                    <User
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        avatar={user.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                                    />
                                ))
                                :
                                <Typography variant='h6'> No Users Found</Typography>
                            }
                        </>

                        }


                    </div>


                    <div className="smHomeRight" id="smHomeRight">
                        <p className='smHomeRightHeader'>Make Friend Globally 🌐</p>
                        {userLoading ? <Loader /> : <>

                            {users && users.length > 0 ?

                                users?.map((user) => (
                                    <User
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        avatar={user.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                                    />
                                ))

                                :
                                <Typography variant='h6'> No Users Found</Typography>
                            }

                        </>

                        }
                    </div>

                    <Diversity1Icon className='peopleIcon' onClick={toggleList} />

                </div>
            }

        </>
    )
}

export default Home

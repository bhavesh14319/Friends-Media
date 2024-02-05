import React, { useEffect, useState } from 'react'
import "./Post.css"
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deletePost, likePost, updatePost } from '../../Actions/post'
import { getFollowingPost, getMyPost, getUserPosts, getUserProfile, loadUser } from '../../Actions/User'
import User from '../User/User'
import CommentCard from '../commentCard/CommentCard'
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';


const Post = ({
    postId,
    caption,
    postImage,
    likes,
    comments,
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
    page
}) => {



    const { user } = useSelector((state) => state.user);






    const params = useParams();
    const [liked, setLiked] = useState(false);

    const [likesUser, setLikesUser] = useState(false);

    const [commentValue, setCommentValue] = useState("");

    const [commentToggle, setCommentToggle] = useState(false);


    const [captionToggle, setCaptionToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState("");


    // console.log("likes", likes);
    // console.log(user)


    const dispatch = useDispatch();


    const handleLike = async () => {
        await dispatch(likePost(postId));

        if (isAccount) {
            dispatch(getMyPost());
        } else if (page === "userProfile") {
            dispatch(getUserPosts(params.id));
        } else {
            dispatch(getFollowingPost())
        }

        setLiked(!liked)




    }

    const isLiked = () => {
        if (likes?.length > 0) {
            for (let i = 0; i < likes.length; i++) {
                if (likes[i]._id === user.user._id) {
                    setLiked(true)
                }
            }
        }

    }


    const handleComment = async (e) => {
        e.preventDefault();

        await dispatch(addComment(postId, commentValue))

        if (isAccount) {
            dispatch(getMyPost());
        } else if (page === "userProfile") {
            dispatch(getUserPosts(params.id));
        } else {
            dispatch(getFollowingPost())
        }
    }

    const updateCaptionHandle = async (e) => {
        e.preventDefault();
        await dispatch(updatePost(captionValue, postId));

        dispatch(getMyPost());


    }


    const deletePostHandle = async (e) => {
        await dispatch(deletePost(postId));
        dispatch(getMyPost());
        dispatch(loadUser());
    }

    const toggleLikesList = ()=>{
        let x = document.getElementById("smHomeRightLikes");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        console.log(x.style.display);
    }


    const toggleCommentsList = ()=>{
        let x = document.getElementById("smHomeRightComments");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        console.log(x.style.display);
    }



    useEffect(() => {
        isLiked();
    }, [likes, user._id])








    return (
        <div className='post'>

            {isAccount &&
            <div className="postHeader">
                {

                    isAccount && <>
                        <Button onClick={() => setCaptionToggle(!captionToggle)}>
                            <MoreVert />
                        </Button>

                        <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>

                            <div className='DialogBox'>

                                <Typography>Update Post</Typography>

                                <form className='commentForm' onSubmit={updateCaptionHandle}>

                                    <input type="text"
                                        value={captionValue}
                                        onChange={(e) => setCaptionValue(e.target.value)}
                                        placeholder='Add new caption'
                                        required
                                    />

                                    <Button type="submit" variant='contained'>update</Button>

                                </form>

                            </div>
                        </Dialog>


                    </>
                }

            </div>
            }
            <img src={postImage} alt="" />

            <div className="postDetails">
                <Avatar src={ownerImage} alt="user" sx={{ height: "3vmax", width: "3vmax" }} />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>

                <Typography fontWeight={100} color={"rgba(0,0,0,0.582"} style={{ alignSelf: "center" }}>{caption}</Typography>
            </div>

            <button
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    margin: "1vmax 2vmax"
                }}
                // onClick={() => setLikesUser(!likesUser)}
                onClick={toggleLikesList}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography>{likes.length} Likes</Typography>
            </button>

            <div className="postFooter">
                <Button onClick={handleLike}>
                    {
                        liked ?
                            <Favorite style={{ color: "red" }} /> :
                            <FavoriteBorder />
                    }
                </Button>
                <Button onClick={() => toggleCommentsList()}> <ChatBubbleOutline /> </Button>
                {isDelete ?
                    <Button onClick={deletePostHandle}> <DeleteOutline />   </Button> : null

                }
            </div>

            {/* <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography>Liked By </Typography>
                    {
                        likes?.map((like) => (
                            <User
                                key={like._id}
                                id={like._id}
                                name={like.name}
                                avatar={like.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                            />
                        ))

                    }
                </div>
            </Dialog> */}

            {/* <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}> */}
                <div className="smHomeRight" id="smHomeRightLikes">
                    <CloseIcon onClick={toggleLikesList} style={{position:"absolute",right:"0px",zIndex:"3",fontSize:"35px",background:"#FFF",borderRadius:"50%",padding:"5px"}}/>
                    <p style={{textAlign:"center",fontSize:"20px",padding:"15px 0"}}>Liked By </p>
                    {
                        likes?.map((like) => (
                            <User
                                key={like._id}
                                id={like._id}
                                name={like.name}
                                avatar={like.avatar.url || "https://bhaveshdigitalresume.netlify.app/static/media/circle.134eeeb1e58895b892195fe8ed63bc9f.svg"}
                            />
                        ))

                    }
                </div>
            {/* </Dialog> */}


                <div className="smHomeRight" id="smHomeRightComments">
                <CloseIcon onClick={toggleCommentsList} style={{position:"absolute",right:"0px",zIndex:"3",fontSize:"35px",background:"#FFF",borderRadius:"50%",padding:"5px"}}/>
                    <p  style={{textAlign:"center",fontSize:"20px",padding:"15px 0"}}>Comments</p>

                    <form className='commentForm' onSubmit={handleComment}>

                        <input type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder='post your comment'
                            required

                        />
                       <button type="submit"><SendIcon style={{background:"#FFF" , padding:"5px", fontSize:"30px", borderRadius:"50%"}}/></button> 
                        {/* <Button type="submit" variant='contained'>Add</Button> */}

                    </form>


                    {
                        comments.length > 0 ? comments.map((item) => (
                            <div style={{width:"100%"}}>
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                            </div>

                        ))

                            :

                            <p  style={{textAlign:"center",fontSize:"20px",padding:"15px 0"}}>No Comments Yet</p>
                    }

                </div>



  


            {/* <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>

                <div className='DialogBox'>

                    <Typography>Comments</Typography>

                    <form className='commentForm' onSubmit={handleComment}>

                        <input type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder='post your comment'
                            required
                        />

                        <Button type="submit" variant='contained'>Add</Button>

                    </form>

                    {
                        comments.length > 0 ? comments.map((item) => (
                            <CommentCard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />

                        ))

                            :

                            <Typography>No Comments Yet</Typography>
                    }

                </div>
            </Dialog> */}
        </div>
    )
}

export default Post


import React, { useState } from 'react'
import { Avatar, Box, Button, CardHeader, IconButton, List, Modal, Popper, TextField } from '@mui/material'
import { MoreVert, Mood } from '@mui/icons-material'
import CommentCard from '../commentCard/CommentCard'
import Swal from 'sweetalert2'
import EmojiPicker from 'emoji-picker-react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPostData } from '../../Actions/post'
import { getUserFeedData } from '../../Actions/User'
import { openAuthModal } from '../../redux/AuthSlice'

const CommentModal = ({open,setOpen,owner,comments,postId,postImage}) => {

    const [emojiToggle, setEmojiToggle] = useState(false);
    const [emojiAnchor, setEmojiAnchor] = useState();
    const [commentText, setCommentText] = useState("");
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state)=>state.authStates)
    const {likeOrCommentLoading: loading} = useSelector((state)=>state.feedStates)

    

    const handleComment = async ()=>{
        if(isAuthenticated){
            await dispatch(addComment(postId,commentText));
            await dispatch(getUserFeedData());
            await dispatch(getPostData(postId))
            setCommentText("");
            setEmojiToggle(false);
        }
        else{
            Swal.fire({
                title: "Please Login First",
                text : "Note: dummy login credentials are provided",
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

    const handleEmojiClick = (e) => {
        setEmojiAnchor(e.target)
        setEmojiToggle(!emojiToggle)
    }

    const handleEmojiSelection = (emoji) => {
        console.log(emoji);
        setCommentText((curr) => curr + emoji.emoji)
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(!open)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Box sx={{ width: { xs: "90%", sm: "70%", md: "60%" }, height: "90%", m: "20px", background: "#f2f2f2", display: "flex" }}>
                <Box flex={1} bgcolor={"red"} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={postImage} alt='post' />
                </Box>
                <Box flex={1} >
                    <CardHeader
                        avatar={
                            <Avatar src={owner.avatar.url} aria-label="recipe" />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVert />
                            </IconButton>
                        }
                        title={owner.name}
                        subheader="September 14, 2016"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>

                        <List sx={{ width: '100%', maxHeight: "75%", overflowY: "scroll", bgcolor: '#f2f2f2', paddingBottom: "35px" }}>
                            {comments?.map((comment) => (
                                <CommentCard key={comment._id} comment={comment} postId={postId} ownerId={owner?._id} isAccount={false} isDelete={false} />
                            ))}


                        </List>

                        <Box sx={{ bottom: "6%", width: "100%" }} position="sticky" >
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: "0px 16px", marginTop: "10px", background: "#f2f2f2" }} >
                                <Mood onClick={handleEmojiClick} sx={{ color: 'action.active', mr: 1, my: 0.5, cursor: "pointer" }} />
                                <TextField sx={{ width: "100%" }} id="input-with-sx" label="Comment...." variant="standard" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                                <Button disabled={loading} onClick={handleComment}>{loading? "Posting": "Post" }</Button>
                            </Box>
                            <Popper
                                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                                sx={{ zIndex: 4000 }}
                                open={emojiToggle}
                                anchorEl={emojiAnchor}
                                placement={"top"}
                            >
                                {() => (
                                    <Box>
                                        <EmojiPicker emojiStyle='google' searchDisabled={true} onEmojiClick={(e) => handleEmojiSelection(e)} />
                                    </Box>
                                )}
                            </Popper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CommentModal

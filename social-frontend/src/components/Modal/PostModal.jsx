import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Divider, Fade, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Popper, Stack, TextField, Typography } from '@mui/material'
import { Favorite, MoreVert, ChatBubbleOutlineRounded, ChatBubble, AccountCircle, Mood } from '@mui/icons-material'
import Post from '../Post/Post'

const PostModal = ({openPostModal,setOpenPostModal,postId,owner,postImage,caption,likes,comments}) => {
    return (
        <Modal open={openPostModal}
            onClose={() => setOpenPostModal(!openPostModal)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: { xs: "90%", sm: "70%", md: "60%" }, height: "90%", m: "20px", background: "#f2f2f2", display: "flex" }}>
                <Post
                    postId={postId}
                    owner={owner}
                    postImage={postImage}
                    caption={caption}
                    likes={likes}
                    comments={comments}
                />
                
            </Box>
        </Modal>
    )
}

export default PostModal

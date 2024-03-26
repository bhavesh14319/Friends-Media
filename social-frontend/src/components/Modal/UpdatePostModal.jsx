

import { CloseRounded, CloudUpload, Mood } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, Modal, TextField, Typography, Popper } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { loadUser } from '../../Actions/User';
import { createPost, getPostData, updatePost } from '../../Actions/post';
import { clearMessage, clearError, closeCreatePostModal } from '../../redux/createPostSlice';
import Swal from 'sweetalert2';
import EmojiPicker from 'emoji-picker-react'

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    min-height: 100px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
  
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UpdatePostModal = ({postId,openUpdatePostModal, setOpenUpdatePostModal}) => {
    const dispatch = useDispatch();

    const [emojiToggle, setEmojiToggle] = useState(false);
    const [emojiAnchor, setEmojiAnchor] = useState();

    const [image, setImage] = useState("https://www.eclosio.ong/wp-content/uploads/2018/08/default.png");

    const [caption, setCaption] = useState("");

    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        console.log(e.target.files)
        if (e.target.files.length) {
            const file = e.target.files[0];
            const Reader = new FileReader();

            Reader.readAsDataURL(file);
            Reader.onload = (e) => {
                if (Reader.readyState === 2) {
                    // console.log(Reader.result);
                    setImage(Reader.result);
                }
            }
        }

    }

    const handleUpdate = async (e) => {

        e.preventDefault();
        setLoading(true);

        await dispatch(updatePost(caption, postId))

       await dispatch(getPostData(postId))

       setLoading(false);
       setOpenUpdatePostModal(false);


    
       setImage("https://www.eclosio.ong/wp-content/uploads/2018/08/default.png")
       setCaption("")


    }


    const handleEmojiClick = (e) => {
        setEmojiAnchor(e.target)
        setEmojiToggle(!emojiToggle)
    }

    const handleEmojiSelection = (emoji) => {
        console.log(emoji);
        setCaption((curr) => curr + emoji.emoji)
    }


    // useEffect(() => {
    //     if (message) {
    //         Swal.fire({
    //             icon: "success",
    //             title: message + " 😃",
    //             toast: true,
    //             position: "bottom",
    //             showConfirmButton: false,
    //             timer: 1500
    //         }).then(() => {
    //             dispatch(clearMessage())
    //         })
    //     }

    //     if (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: error + " 😥",
    //             toast: true,
    //             position: "bottom",
    //             showConfirmButton: false,
    //             timer: 1500
    //         }).then(() => {
    //             dispatch(clearError())
    //         })
    //     }
    // }, [message, error, dispatch])

    return (
        <Modal
            open={openUpdatePostModal}
            onClose={()=>setOpenUpdatePostModal(false)}
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
            <Box sx={{ position: "relative", overflow: "hidden", maxHeight: "90%", width: { xs: "100%", sm: "70%", md: "30%" }, m: "20px", p: "20px", background: "#f2f2f2", borderRadius: "15px", boxShadow: "0 5px 15px rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton onClick={() => dispatch(closeCreatePostModal())} sx={{ position: "absolute", right: "0", top: "0" }}><CloseRounded /></IconButton>

                <Box component="form" autoComplete='false' onSubmit={handleUpdate} style={{  display: "flex", width: "100%", flexDirection: "column" }}>

                    <Typography sx={{ fontWeight: "400", fontSize:{xs:"25px",md:"30px"}, alignSelf: "center", textTransform: "none", marginBottom: "15px" }} > Update Post</Typography>

                    {/* <img src={image} style={{ width: "100%", maxHeight: "300px", alignSelf: "center", objectFit: "contain" }} />

                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        sx={{ width: "100px", textTransform: "none", alignSelf: "center", marginTop: "10px", marginBottom: "15px" }}
                    >
                        Image
                        <VisuallyHiddenInput required onChange={handleImageChange} type="file" accept='image/*' />
                    </Button> */}

                    <Textarea
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Update Caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}

                    />

                    <Box  sx={{width:"100%", display: 'flex',flexGrow:"1",alignItems:"center", marginTop: "15px", background: "#f2f2f2"}} >
                        <Mood onClick={handleEmojiClick} sx={{color: 'action.active' , my: 0.5, mr:"-1em", cursor: "pointer" }} />
                        <Button type='submit' disabled={loading} variant="contained" sx={{ width: "100px", margin:"0 auto" }}><Typography sx={{ textTransform: "none" }}>{loading ? <CircularProgress sx={{ padding: "3px 0", color: "#f2f2f2" }} size={18} thickness={5} /> : "Update"}</Typography></Button>
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

        </Modal>
    )
}

export default UpdatePostModal

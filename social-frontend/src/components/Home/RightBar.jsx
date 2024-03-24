import { BoltRounded } from '@mui/icons-material'
import { Box, ImageList, ImageListItem, List, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import ListUser from '../User/ListUser'
import { getAllUsers, getLatestPosts, getSuggestedUsersData } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import PostModal from '../Modal/PostModal';


const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
  ];

const RightBar = () => {    

    const dispatch = useDispatch();
    const {suggestedUsers} = useSelector((state)=>state.feedStates)
    const {latestPosts}= useSelector((state)=>state.feedStates)
    const {isAuthenticated} = useSelector((state)=>state.authStates);

    const [opentPostModal, setOpenPostModal] = useState(false);

    const getSuggestedUsers = async ()=>{

 
      if(isAuthenticated){
         dispatch(getSuggestedUsersData());
      }else{
          dispatch(getAllUsers());
      }
    }
    const getLatestPostsData = async ()=>{

        dispatch(getLatestPosts());
    } 

    useEffect(()=>{
        getSuggestedUsers();
    },[isAuthenticated])

    useEffect(()=>{
      getLatestPostsData();
    },[])

    return (
        <Box sx={{ display: { xs: "none", md: "block" } ,height:"100%"}} flex={2} p={2}>
            <Box position="static" >

                <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "300" }}>Suggested for you</Typography>

                <List sx={{ width: "100%", height: "215px", maxHeight: "275px", overflowY: "scroll" }}  >
                    {suggestedUsers.map((user)=>(
                        <ListUser key={user._id} avatar={user.avatar.url} name={user.name} userId={user._id}/>
                    ))}
                    
     

                </List>


                {/* lates posts image grid */}

                <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "300", margin: "15px 0" }}>Latest Posts</Typography>
                {/* <Box> */}

                    <ImageList sx={{ minHeight:"300px" }} cols={3}  gap={5}>
                        {latestPosts.map((post) => (
                        
                            <ImageListItem  key={post._id}   sx={{maxHeight:"150px",maxWidth:"150ox",cursor:"pointer", overflow:"hidden"}}>
                                <img
                                  
                                    src={post.image.url}
                                    alt={"post image"}
                                    loading="lazy"
                                    // height="50px"
                                    // width="50px"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>

                    {/* <PostModal
                              key={post._id}
                              opentPostModal={opentPostModal}
                              setOpenPostModal={setOpenPostModal}
                              postId={post._id}
                              owner={post.owner}
                              caption={post.caption}
                              comments={post.comments}
                              likes={post.likes}
                              postImage={post?.avatar?.url}
                            
                    /> */}


                {/* </Box> */}
                

            </Box>
        </Box>
    )
  }

export default RightBar

import { BoltRounded } from '@mui/icons-material'
import { Box, ImageList, ImageListItem, List, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import ListUser from '../User/ListUser'
import { getAllUsers, getLatestPosts, getSuggestedUsersData } from '../../Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import SearchedUserShimmer from '../Shimmer/SearchedUserShimmer';
import ProfilePostModal from '../Modal/ProfilePostModal';

const shimmerUsers = [
  <SearchedUserShimmer />,
  <SearchedUserShimmer />,
  <SearchedUserShimmer />,
  <SearchedUserShimmer />,
  <SearchedUserShimmer />,
]


const RightBar = () => {

  const dispatch = useDispatch();
  const { suggestedUsers } = useSelector((state) => state.feedStates)
  const { latestPosts, usersLoading } = useSelector((state) => state.feedStates)
  const { isAuthenticated } = useSelector((state) => state.authStates);

  const [openProfilePostModal, setOpenProfilePostModal] = useState(false);
  const [activePostId, setActivePostId] = useState("");


  const getSuggestedUsers = async () => {


    if (isAuthenticated) {
      dispatch(getSuggestedUsersData());
    } else {
      dispatch(getAllUsers());
    }
  }
  const getLatestPostsData = async () => {

    dispatch(getLatestPosts());
  }

  useEffect(() => {
    getSuggestedUsers();
  }, [isAuthenticated])

  useEffect(() => {
    getLatestPostsData();
  }, [])

  return (
    <Box sx={{ display: { xs: "none", md: "block" }, height: "100%" }} flex={2} p={2}>
      <Box position="static" >

        <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "300" }}>Suggested for you</Typography>

        {usersLoading && shimmerUsers.map((user, index) => <div key={index}> {user} </div>  ) }
        {!usersLoading &&
          <List sx={{ width: "100%", height: "215px", maxHeight: "275px", overflowY: "scroll" }}  >
            {
              suggestedUsers.map((user) => (
              <ListUser key={user._id} avatar={user.avatar.url} name={user.name} userId={user._id} followers={user.followers} />
            ))
            
          }
          </List>
        }

        {/* lates posts image grid */}

        <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "300", margin: "15px 0" }}>Latest Posts</Typography>
        {/* <Box> */}

        <ImageList sx={{ minHeight: "300px" }} cols={3} gap={5}>
          {latestPosts.map((post) => (

            <ImageListItem onClick={()=>{setOpenProfilePostModal(true); setActivePostId(post._id)}} key={post._id} sx={{ minHeight: "150px", maxHeight: "150px", maxWidth: "150ox", cursor: "pointer", overflow: "hidden" }}>
              <img

                src={post.image.url}
                alt={"post image"}
                loading="lazy"
                style={{ objectFit: "cover" }}
              // height="50px"
              // width="50px"
              />
            </ImageListItem>
          ))}
        </ImageList>




      </Box>
      
      {
        openProfilePostModal &&
       <ProfilePostModal
          postId={activePostId}
          openProfilePostModal={openProfilePostModal}
          setOpenProfilePostModal={setOpenProfilePostModal}
       />
      }
    </Box>
  )
}

export default RightBar

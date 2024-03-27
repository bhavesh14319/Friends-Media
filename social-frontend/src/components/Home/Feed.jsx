import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getFeedData, getUserFeedData } from '../../Actions/User'
import { Box, Typography } from '@mui/material'
import PostShimmer from '../Shimmer/PostShimmer'

let shimmerPosts = [
  <PostShimmer />,
  <PostShimmer />,
  <PostShimmer />,
  <PostShimmer />,
  <PostShimmer />,
]


const Feed = () => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authStates);
  const { posts: feed, postsLoading } = useSelector((state) => state.feedStates);

  // const { error: likeError, message } = useSelector((state) => state.like);




  const getFeed = async () => {

    if (isAuthenticated) {
      dispatch(getUserFeedData())
    } else {
      dispatch(getFeedData());
    }
  }

  useEffect(() => {
    getFeed();
  }, [isAuthenticated])
  return (
    <Box sx={{ borderRight: "1px solid #707070", marginLeft: "0px !important", padding: { xs: "1em 1em", md: "2em 1em", lg: "2em 2em" } }} flex={3} marginLeft={0}>
      {
        postsLoading && shimmerPosts.map((post, index) => (
          <div key={index}>
            {post}
          </div>
        ))
      }

      {
        !postsLoading && feed.length===0 && 

        <Typography variant='h6' textAlign={"center"}>No Posts Yet</Typography> 

      }

      {!postsLoading && feed?.map((feedItem) => (
        <Post
          key={feedItem._id}
          postId={feedItem._id}
          caption={feedItem.caption}
          comments={feedItem.comments}
          likes={feedItem.likes}
          owner={feedItem.owner}
          postImage={feedItem.image.url}

        />
      ))}
      {/*             
            <Post/>
            <Post/> */}

    </Box>
  )
}

export default Feed




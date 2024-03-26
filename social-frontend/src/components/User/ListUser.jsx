
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Avatar, Box, Button, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthModal } from '../../redux/AuthSlice'
import Swal from 'sweetalert2'
import { followUnfollow, loadUser } from '../../Actions/User'

const ListUser = ({ userId, name, avatar, followers, isSearched }) => {

  const dispatch = useDispatch();
  const { isAuthenticated, authorizedUser: user } = useSelector((state) => state.authStates);
  const [processing, setProcessing] = useState(false);
  const [followed, setFollowed] = useState(false)

  console.log(userId)

  const handleFollow = async () => {
    if (isAuthenticated) {

      setProcessing(true);
      const res = await followUnfollow(userId);
      await dispatch(loadUser(dispatch))
      

      console.log(res);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: res.message + " 😃",
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setFollowed(!followed)
          setProcessing(false);
        })
      }


    } else {
      Swal.fire({
        title: "Please Login First",
        text: "Note: dummy login credentials are provided",
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

  useEffect(() => {
    if (user) {

      user.following.map((user) => {

        if (String(user?._id) === String(userId)) {
          // logged in  user follows this user
          setFollowed(true);
        }
      })
    }
  }, [user])

  return (
    <>

      <ListItem alignItems="center" sx={{ paddingLeft: "0" }}>
        <Link to={`/profile/${userId}`} style={{display:"flex", alignItems:"center",width:"100%"}}  >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={name}

            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {followers?.length}
                </Typography>
                {" followers"}
              </React.Fragment>
            }
          />
        </Link>
        {!isSearched &&
          < Button onClick={handleFollow}><Typography content='p' sx={{ textTransform: "lowercase" }}>{processing ? <CircularProgress size={18} /> : <>{followed ? "unfollow" : "follow"}</>}</Typography></Button>
        }
      </ListItem >
      <Divider variant="inset" />

    </>
  )
}

export default ListUser

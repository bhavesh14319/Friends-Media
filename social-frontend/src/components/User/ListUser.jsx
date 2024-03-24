
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { openAuthModal } from '../../redux/AuthSlice'
import Swal from 'sweetalert2'
import { followUnfollow, loadUser } from '../../Actions/User'

const ListUser = ({ userId, name, avatar }) => {

  const dispatch = useDispatch();
  const { isAuthenticated,authorizedUser:user} = useSelector((state) => state.authStates);

  const [followed, setFollowed] = useState(false)

  const handleFollow = async () => {
    if (isAuthenticated) {
      

      const res = await followUnfollow(userId);
      dispatch(loadUser(dispatch))

      console.log(res);
      if(res.success){
        Swal.fire({
          icon:"success",
          title: res.message + " 😃",
          toast:true,
          position:"bottom",
          showConfirmButton:false,
          timer:1500
        }).then(()=>{
          setFollowed(!followed)
        })
      }


    } else {
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

  useEffect(()=>{
    if(user){
      
      user.following.map((user)=>{
        
        if(String(user._id) === String(userId)){
          // logged in  user follows this user
          console.log("checking for: ", user.name , "true")
          setFollowed(true); 
        }
      })
    }
  },[user])

  return (
    <>
      <ListItem alignItems="center" sx={{ paddingLeft: "0" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
        // secondary={
        //     <React.Fragment>
        //         <Typography
        //             sx={{ display: 'inline' }}
        //             component="span"
        //             variant="body2"
        //             color="text.primary"
        //         >
        //             Ali Connors
        //         </Typography>
        //         {" — I'll be in your neighborhood doing errands this…"}
        //     </React.Fragment>
        // }
        />
        <Button onClick={handleFollow}><Typography content='p' sx={{ textTransform: "lowercase" }}> {followed? "unfollow" : "follow"}</Typography></Button>
      </ListItem>
      <Divider variant="inset"  />
    </>
  )
}

export default ListUser

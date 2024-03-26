import React, { useState } from 'react'
import { AddRounded, Home, Search } from '@mui/icons-material';
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { openCreatePostModal } from '../../redux/createPostSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { openAuthModal } from '../../redux/AuthSlice';
import SearchDrawer from '../Search/Search';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated,authorizedUser:user } = useSelector((state) => state.authStates);

  const [searchAnchor, setSearchAnchor] = useState();
  const [openSearch, setOpenSearch] = useState(false);

  const handleCreatePost = () => {
    if (isAuthenticated) {
      dispatch(openCreatePostModal())
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


  const handleProfile = ()=>{
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
  





  return (
    <Box sx={{ display: { xs: "none", sm: "flex" }, borderRight: "1px solid #707070" }} flex={1} p={2} >
      <Box position="fixed" >
        <List>
          <ListItem disablePadding>
            <Link to={"/"}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "50px" }}>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to={"/search"}>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "50px" }}>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding onClick={handleCreatePost}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "50px" }}>
                <AddRounded />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            {!isAuthenticated ? 
            (
                <ListItemButton onClick={handleProfile}>
                  <ListItemIcon sx={{ minWidth: "50px" }}>
                    <Avatar sx={{ height: "1em", width: "1em" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
            ):
            (
              <Link to={`/profile/${user._id}`} >
                <ListItemButton >
                  <ListItemIcon sx={{ minWidth: "50px" }}>
                    <Avatar sx={{ height: "1em", width: "1em" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>
            )
            }
          </ListItem>

        </List>
      </Box>


    </Box>
  )
}

export default SideBar

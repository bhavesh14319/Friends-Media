import React from 'react'
import {AddRounded, Home,Search } from '@mui/icons-material';
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const SideBar = () => {
  return (
    <Box sx={{display:{xs:"none",sm:"flex"},borderRight:"1px solid #707070"}} flex={1} p={2} >
    <Box  position="fixed" flex={1}>
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{minWidth:"50px"}}>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{minWidth:"50px"}}>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{minWidth:"50px"}}>
                <AddRounded />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{minWidth:"50px"}}>
                <Avatar  sx={{height:"1em", width:"1em"}}/>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
    </Box>
  )
}

export default SideBar

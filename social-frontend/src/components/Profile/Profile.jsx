import { Box, Stack } from '@mui/material'
import React from 'react'
import SideBar from '../Home/SideBar'
import ProfileContainer from './ProfileContainer'

const Profile = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar />
        <ProfileContainer/>
      </Stack>

    </Box>
  )
}

export default Profile

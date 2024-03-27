import React from 'react'

import Feed from './Feed';
import SideBar from './SideBar';
import RightBar from './RightBar';
import { Box, Stack } from '@mui/material';



const Home = () => {

  return (
    <Box>
        <Stack sx={{minHeight:"100vh" }} direction="row" spacing={2} justifyContent="space-between"> 
            <SideBar/>
            <Feed />
            <RightBar/>
        </Stack>
    </Box>
  )
}

export default Home

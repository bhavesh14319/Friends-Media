import { Box, Stack } from '@mui/material'
import React from 'react'
import SideBar from '../Home/SideBar'
import AccountContainer from './AccountContainer'

const Account = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar />
        <AccountContainer/>
      </Stack>

    </Box>
  )
}

export default Account

import { CloseRounded } from '@mui/icons-material'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import ListUser from '../User/ListUser'

const LikesFollowersFollowingModal = ({ open, setOpen, data , title}) => {
 
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", maxHeight: "90%", width: { xs: "100%", sm: "70%", md: "20%" }, m: "20px", p: "20px", background: "#f2f2f2", borderRadius: "15px", boxShadow: "0 5px 15px rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", right: "0", top: "0" }}><CloseRounded /></IconButton>
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" , height:"500px"}}>
        <Typography sx={{ fontWeight: "400", fontSize: "20px", textTransform: "none", marginBottom: "15px", alignSelf:"center" }} > {title}</Typography>
            
            {

              data?.map((user)=>(
                <ListUser key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} />
              ))
            }
        </Box>

      </Box>

    </Modal>
  )
}

export default LikesFollowersFollowingModal

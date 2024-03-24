import { CloudUpload } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Modal, TextField, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { closeAuthModal, authRequest, authSuccess, authFailure } from '../../redux/AuthSlice';
import { loginUser, registerUser } from '../../Actions/User';
import Swal from 'sweetalert2';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AuthModal = () => {
  // hooks
  const dispatch = useDispatch();
  const { openAuthModal, authLoading: loading } = useSelector((state) => state.authStates)

  console.log(openAuthModal)


  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    dispatch(authRequest());

    setTimeout(async () => {

      const res = await loginUser(email, password)
      console.log(res);
      if (res.success) {
        dispatch(authSuccess(res.user))
        Swal.fire({
          icon: "success",
          title: "Logged In Successfully! 😃",
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          dispatch(closeAuthModal())
        })

      } else {
        dispatch(authFailure(res.data.message))
      }
    }, 2000);



  }

  const handleRegister = async (e) => {

    
    e.preventDefault();

    dispatch(authRequest())

    setTimeout(async () => {
      const res = await registerUser(name, email, password, image)
      console.log(res);
      if (res.success) {
        dispatch(authSuccess(res.user))
        Swal.fire({
          icon: "success",
          title: "User registered Successfully! 😃",
          toast: true,
          position: "bottom",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          dispatch(closeAuthModal())
        })

      } else {
        dispatch(authFailure(res.data.message))
      }
    }, 2000);

  }


  const handleImageChange = (e) => {
    console.log(e.target.files)
    if (e.target.files.length) {
      const file = e.target.files[0];
      const Reader = new FileReader();

      Reader.readAsDataURL(file);
      Reader.onload = (e) => {
        if (Reader.readyState === 2) {
          // console.log(Reader.result);
          setImage(Reader.result);
        }
      }
    }

  }








  const handleModalClose = () => {
    dispatch(closeAuthModal())
  }




  return (
    <Modal open={openAuthModal} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ position: "relative", overflow: "hidden", maxHeight: "90%", width: { xs: "100%", sm: "70%", md: "30%" }, m: "20px", p: "20px", background: "#f2f2f2", borderRadius: "15px", boxShadow: "0 5px 15px rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <IconButton onClick={handleModalClose} sx={{ position: "absolute", right: "0", top: "0" }}><CloseRounded /></IconButton>
        {/* login form */}
        <Box component="form" onSubmit={handleLogin} sx={{ display: showRegisterForm ? "none" : "flex", width: "100%", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "400", fontSize: "30px", alignSelf: "flex-start", textTransform: "none", marginBottom: "15px" }} > Sign In </Typography>
          <Typography>Email</Typography>

          <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ marginTop: "10px", marginBottom: "15px" }} id="fullWidth" required placeholder='Enter your email address' inputProps={{ style: { padding: "10px" } }} />

          <Typography>Password</Typography>
          <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginTop: "10px", marginBottom: "30px" }} id="fullWidth" required placeholder='Enter your password' inputProps={{ style: { padding: "10px" } }} />

          <Button type='submit' disabled={loading} variant="contained" sx={{ width: "100px", alignSelf: "center" }}><Typography sx={{ textTransform: "none", display: "flex", alignItems: "center" }}>{loading ? <CircularProgress sx={{ padding: "3px 0", color: "#f2f2f2" }} size={18} thickness={5} /> : "Login"}</Typography></Button>

          <Button onClick={() => setShowRegisterForm(true)} sx={{ margin: "10px 0", alignSelf: "flex-start" }} ><Typography sx={{ textTransform: "none" }}>Don't have account? Sign Up</Typography></Button>
        </Box>



        <form autoComplete='off' onSubmit={handleRegister} style={{display: showRegisterForm ? "flex" : "none", width: "100%", flexDirection: "column" }}>

          <Typography sx={{ fontWeight: "400", fontSize: "30px", alignSelf: "flex-start", textTransform: "none", marginBottom: "15px" }} > Sign Up </Typography>

          <Avatar src={image && image} sx={{ width: "100px", height: "100px", alignSelf: "center" }} />

          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{ width: "100px", textTransform: "none", alignSelf: "center", marginTop: "10px", marginBottom: "15px" }}
          >
            Avatar
            <VisuallyHiddenInput required onChange={handleImageChange} type="file" accept='image/*' />
          </Button>

          <Typography>Name</Typography>
          <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth sx={{ marginTop: "10px", marginBottom: "15px" }} id="fullWidth" required placeholder='Enter your name' inputProps={{ style: { padding: "10px" } }} />

          <Typography>Email</Typography>
          <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ marginTop: "10px", marginBottom: "15px" }} id="fullWidth" required placeholder='Enter your email address' inputProps={{ style: { padding: "10px" } }} />

          <Typography>Password</Typography>
          <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginTop: "10px", marginBottom: "30px" }} id="fullWidth" required placeholder='Enter your password' inputProps={{ style: { padding: "10px" } }} />

          <Button type='submit' disabled={loading} variant="contained" sx={{ width: "100px", alignSelf: "center" }}><Typography sx={{ textTransform: "none" }}>{loading ? <CircularProgress sx={{ padding: "3px 0", color: "#f2f2f2" }} size={18} thickness={5} /> : "Sign Up"}</Typography></Button>

          <Button onClick={()=>setShowRegisterForm(false)} sx={{ margin: "10px 0", alignSelf: "flex-start" }} ><Typography sx={{ textTransform: "none" }}>Already have account? Sign In</Typography></Button>
        </form>

      </Box>

    </Modal>
  )
}

export default AuthModal

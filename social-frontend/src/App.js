

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import { Box } from '@mui/material';
import NavBar from './components/Header/NavBar';
import AuthModal from "./components/Modal/AuthModal";
import CreatePostModal from "./components/Modal/CreatePostModal";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import { useEffect } from "react";



function App() {

  
  const {isAuthenticated}= useSelector((state)=>state.authStates)
  const dispatch = useDispatch();



  const loadUserData = async () => {

     await dispatch(loadUser());

  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loadUserData();
    }
  }, [dispatch, isAuthenticated])
  return (
    <Box>
      <AuthModal />
      <CreatePostModal/>
      <Router>
        <div className="App">
          {/* {isAuthenticated && <Header />} */}
          <NavBar />
          
          <Routes>
            {/* <Route path="/login" element={<Login />}></Route> */}
            {/* <Route path="/" element={isAuthenticated? <Home/> : <Login/>}></Route> */}

            {/* <Route path="/register" element={<Register />}></Route> */}

            <Route path="/" element={<Home />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/profile/:id" element={<Profile />}>

            </Route>

            {/* <Route path="/account" element={isAuthenticated ? <Account /> : <Login />}></Route> */}

            {/* <Route path="/newpost" element={<NewPost />}></Route> */}

            {/* <Route path="/update/profile" element={isAuthenticated? <UpdateProfile/> : <Login/>}></Route> */}

            {/* <Route path="/update/password" element={isAuthenticated? <UpdatePassword/> : <Login/>}></Route> */}

            {/* <Route path="/forgot/password" element={isAuthenticated? <UpdatePassword/> : <ForgotPassword/>}></Route> */}

            {/* <Route path="/password/reset/:token" element={isAuthenticated? <UpdatePassword/> : <ResetPassword/>}></Route> */}

            {/* <Route path="/user/:id" element={<UserProfile />}></Route> */}

            {/* <Route path="/search" element={<Search />}></Route> */}

          </Routes>
        </div>
      </Router>
    </Box>
  );
}

export default App;

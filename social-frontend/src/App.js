

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from './components/Login/Login';






import Home from './components/Home/Home';


import Register from './components/Register/Register';

import { Box } from '@mui/material';
import NavBar from './components/Header/NavBar';
import AuthModal from "./components/Modal/AuthModal";



function App() {

  



  // const loadUserData = async () => {
  //   dispatch(LoginRequest());

  //   const res = await loadUser();

  //   if (res.success) {
  //     dispatch(LoginSuccess(res.user))
  //   } else {
  //     dispatch(LoginFailure(res.data.message))
  //   }

  // }

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     // loadUserData();
  //     redirect("/home")
  //   }
  // }, [dispatch, isAuthenticated])
  return (
    <Box>
      <AuthModal />
      <Router>
        <div className="App">
          {/* {isAuthenticated && <Header />} */}
          <NavBar />
          
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/" element={isAuthenticated? <Home/> : <Login/>}></Route> */}

            <Route path="/register" element={<Register />}></Route>

            <Route path="/" element={<Home />}>

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

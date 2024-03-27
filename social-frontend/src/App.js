

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
import Account from "./components/Profile/Account";



function App() {

  const {isAuthenticated}= useSelector((state)=>state.authStates)
  const dispatch = useDispatch();


  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(loadUser());
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

            <Route path="/" element={<Home />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/profile" element={<Account />}/>
            
            
          </Routes>
        </div>
      </Router>
    </Box>
  );
}

export default App;

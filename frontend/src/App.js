import './App.css';

import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import UpdatePassword from './components/updatePassword/UpdatePassword';
import ForgotPassword from './components/forgotpassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile/UserProfile';
import Search from './components/Search/Search';


function App() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.user);




  useEffect(()=>{
    
    if(localStorage.getItem('token')){
      dispatch(loadUser());
    }
  },[dispatch,isAuthenticated])
  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Header/>}

        <Routes>
          <Route path="/" element={isAuthenticated? <Home/> : <Login/>}></Route>

          <Route path="/register" element={isAuthenticated? <Account/> : <Register/>}></Route>

          <Route path="/account" element={isAuthenticated? <Account/> : <Login/>}></Route>
        
          <Route path="/newpost" element={isAuthenticated? <NewPost/> : <Login/>}></Route>

          <Route path="/update/profile" element={isAuthenticated? <UpdateProfile/> : <Login/>}></Route>

          <Route path="/update/password" element={isAuthenticated? <UpdatePassword/> : <Login/>}></Route>

          <Route path="/forgot/password" element={isAuthenticated? <UpdatePassword/> : <ForgotPassword/>}></Route>

          <Route path="/password/reset/:token" element={isAuthenticated? <UpdatePassword/> : <ResetPassword/>}></Route>

          <Route path="/user/:id" element={isAuthenticated? <UserProfile/> : <Login/>}></Route>
        
          <Route path="/search" element={isAuthenticated? <Search/> : <Login/>}></Route>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;

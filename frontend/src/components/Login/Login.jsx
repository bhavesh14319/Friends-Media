import React, { useState } from 'react'
import "./Login.css"

import { Typography,Button } from '@mui/material'

import image from "../../assets/login_photo.svg"

import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Actions/User'
import { useAlert } from 'react-alert'
import { useEffect } from 'react'

const Login = () => {

    const [email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const dispatch = useDispatch();

    const alert = useAlert();

    const {error } = useSelector((state)=>state.user);


    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(loginUser(email,password));
    }

    useEffect(()=>{
        console.log(error);
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
    },[error,alert,dispatch])

  return (
    <div className='login'>
        <form className='loginForm' on onSubmit={handleLogin}>

            <p className="loginHeader" >
                Friends Media
            </p>

            <img className='loginImage' src={image} alt="logo image" />

            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' required/>
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'  required/>



            <button type='submit' className="loginButton">Login</button>

            <div className="optionsDiv">

            <Link to="/register">
                <Typography variant='h6' style={{padding:"2vmax"}}>
                    New User?
                </Typography>
            </Link>

            <Link to="/forgot/password">
                <Typography variant='h6' style={{padding:"2vmax"}}>
                    forgot password?
                </Typography>
            </Link>

            </div>
        </form>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import "./Login.css"

import { Typography,Button } from '@mui/material'

import image from "../../assets/login_photo.svg"

import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'


import {LoginRequest,LoginSuccess,LoginFailure, } from "../../redux/userSlice"
import { loginUser } from '../../Actions/User'

import { useEffect } from 'react'
import Loader from '../Loader/Loader'

const Login = () => {

    const {loading} = useSelector((state)=>state.user)
    const [email,setEmail] = useState("temp@gmail.com");
    const[password,setPassword] = useState("123456");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {error } = useSelector((state)=>state.user);


    const handleLogin = async (e)=>{
        e.preventDefault();
        dispatch(LoginRequest());
        const res = await loginUser(email,password)
        console.log(res);
        if(res.success){
            dispatch(LoginSuccess(res.user))
            navigate("/home");
            
        }else{
            dispatch(LoginFailure(res.data.message))
        }

    }


    useEffect(()=>{
        Swal.fire({
            icon:'info',
            title:"Note",
            text:"Hit Login button to login using dummy account 👊."
        })
    },[])

    useEffect(()=>{
        console.log(error);
        if(error){
        
            dispatch({type:"clearErrors"});
        }
    },[error,dispatch])

  return (
    <div className='login'>
        <form className='loginForm'  onSubmit={handleLogin}>

            <p className="loginHeader" >
                Login
            </p>

            {/* <img className='loginImage' src={image} alt="logo image" /> */}

            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' required/>
            <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'  required/>


            {loading && <Loader/>}
            <button type='submit' className="loginButton">{loading? "Logging in" : "Login"}</button>

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

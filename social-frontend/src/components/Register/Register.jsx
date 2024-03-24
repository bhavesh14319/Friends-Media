import React, { useEffect, useState } from 'react'
import "./Register.css"
import { Avatar, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {RegisterRequest,RegisterSuccess,RegisterFailure} from "../../redux/userSlice"
import { registerUser } from '../../Actions/User';

import image from "../../assets/login_photo.svg"

const Register = () => {

    const {loading} = useSelector((state)=>state.user);
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [avatar,setAvatar] = useState(image);

    const navigate = useNavigate();
    const dispatch= useDispatch();



    const handleRegister = async (e)=>{
        e.preventDefault();
        dispatch(RegisterRequest())

       const res= await registerUser(name,email,password,avatar);

        if(res.success){
           dispatch(RegisterSuccess(res.user))
        }else{
            dispatch(RegisterFailure(res.data.message)) 
        }
       
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        
        Reader.readAsDataURL(file);
        Reader.onload=(e)=>{
            if(Reader.readyState === 2){
                console.log(Reader.result);
                setAvatar(Reader.result);
            }
        }
    }

    // useEffect(()=>{
    //     if(error){
           
    //         dispatch({type:"clearErrors"});
    //     }


    // },[error,dispatch])

  return (
    <div className='register'>
        <form className='registerForm' onSubmit={handleRegister}>
            <p className="loginHeader">
                Friends Media
            </p>

            {/* <img className='loginImage' src={image} alt="logo image" /> */}

            <Avatar className="avatar" src={avatar} alt="user" sx={{height:"10vmax",width:"10vmax"}}/>
        
            <input type="file" accept="image/*" name="upload" id="pImg" onChange={handleImageChange} />
            <input className='registerInputs' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' />
            <input className='registerInputs' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' required/>
            <input className='registerInputs' type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'  required/>

            
            <button className="loginButton" type='submit'>{loading? "Registering": "Register"}</button>
            <div className="optionsDiv" style={{justifyContent:"flex-end"}} >
            <Link to="/login"><Typography variant='h6' style={{padding:"2vmax",alignSelf:"flex-end"}}>Already Registered? Login Now </Typography></Link>
            </div>
        </form>
    </div>
  )
}

export default Register

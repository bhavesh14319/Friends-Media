import React, { useEffect, useState } from 'react'
import "./Register.css"
import { Avatar, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/User';
import { useAlert } from 'react-alert';
import image from "../../assets/login_photo.svg"

const Register = () => {

    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [avatar,setAvatar] = useState(image);

    const navigate = useNavigate();
    const dispatch= useDispatch();

    const alert = useAlert();


    const {loading,error} =  useSelector((state)=>state.user);

    const handleRegister = async (e)=>{
        e.preventDefault();

        await dispatch(registerUser(name,email,password,avatar));

        if(error){
            alert.error(error);
        }else{
            navigate("/");  
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

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }


    },[error,dispatch,alert])

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

            
            <button className="loginButton" type='submit'>Register</button>
            <div className="optionsDiv" style={{justifyContent:"flex-end"}} >
            <Link to="/"><Typography variant='h6' style={{padding:"2vmax",alignSelf:"flex-end"}}>Already Registered? Login Now </Typography></Link>
            </div>
        </form>
    </div>
  )
}

export default Register

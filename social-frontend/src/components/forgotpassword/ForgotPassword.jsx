import React, { useState } from 'react'
import "./ForgotPassword.css"

// import { Typography,Button } from '@mui/material's

import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../Actions/User'

import { useEffect } from 'react'

const ForgotPassword = () => {

    const [email,setEmail] = useState("");

    const dispatch = useDispatch();



    const {error ,loading,message } = useSelector((state)=>state.like);


    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(()=>{
        console.log(error);
        if(error){
        
            dispatch({type:"clearErrors"});
        }

        if(message){
            
            dispatch({type:"clearErrors"});
        }
    },[error,message,dispatch])

  return (
    <div className='forgotPassword'>
        <form className='forgotPasswordForm' on onSubmit={handleSubmit}>

            <p className='loginHeader' variant='h3' style={{padding:"2vmax"}}>
                Friends Media
            </p>

            <input type="email" className='forgotPasswordInputs' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' required/>
            

            <button className='updateBtn' disabled={loading} type='submit'>Send Token</button>


        </form>
    </div>
  )
}

export default ForgotPassword

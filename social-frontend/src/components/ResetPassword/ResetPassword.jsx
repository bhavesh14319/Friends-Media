import React from 'react'
import { useState } from 'react'

import "./ResetPassword.css"
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { resetPassword } from '../../Actions/User';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");

    const params = useParams();

    const dispatch = useDispatch();
   

    const { error, loading, message } = useSelector((state) => state.like);


    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(resetPassword(params.token, newPassword));
    }

    useEffect(() => {
        console.log(error);
        if (error) {
           
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            
            dispatch({ type: "clearMessage" });
        }
    }, [error, message, dispatch])
    return (
        <div className='resetPassword'>
            <form className='resetPasswordForm' onSubmit={handleSubmit}>

                <Typography variant='h3' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>



                <input type="password" className='resetPasswordInputs' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' required />


                <Link to="/">
                    <Typography >
                        Login
                    </Typography>
                </Link>

                <Typography >
                        OR
                    </Typography>

                <Link to="/forgot/password">
                    <Typography >
                        Request another token
                    </Typography>
                </Link>



                <button className='updateBtn' disabled={loading} type='submit'>Reset Password</button>

                


            </form>
        </div>
    )
}

export default ResetPassword

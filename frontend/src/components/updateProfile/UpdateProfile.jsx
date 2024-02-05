import React, { useEffect, useState } from 'react'
import "./UpdateProfile.css"
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import { useAlert } from 'react-alert';
// import Loader from '../Loader/Loader';


const UpdateProfile = () => {

    const {  error, user } = useSelector((state) => state.user);



    const { loading: updateLoading, error: updateError, message } = useSelector((state) => state.like);



    const [name, setName] = useState(user.user.name)
    const [email, setEmail] = useState(user.user.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPrev, setAvatarPrev] = useState(user.user.avatar.url);


    const dispatch = useDispatch();

    const alert = useAlert();




    const handleRegister = async (e) => {
        e.preventDefault();

        await dispatch(updateProfile(name, email, avatar));

        dispatch(loadUser());

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.readAsDataURL(file);
        Reader.onload = (e) => {
            if (Reader.readyState === 2) {
                console.log(Reader.result);
                setAvatar(Reader.result);
                setAvatarPrev(Reader.result);
            }
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            alert.success(message.message);
            dispatch({ type: "clearMessage" });
        }


    }, [error,message,updateError,alert,dispatch])

    return (<div className='updateProfile'>
                    <form className='updateProfileForm' onSubmit={handleRegister}>
                        <p className='loginHeader' variant='h3'>
                            Friends Media
                        </p>

                        <Avatar className="avatar" src={avatarPrev} alt="user" sx={{ height: "10vmax", width: "10vmax" }} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <input className='updateProfileInputs' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                        <input className='updateProfileInputs' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address'  />


                        <button className='updateBtn' disabled={updateLoading} type='submit'>Update</button>
                    </form>
                </div>
    )
}

export default UpdateProfile;


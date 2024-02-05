import React, { useEffect, useState } from 'react'
import "./NewPost.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../Actions/post';
import { useAlert } from 'react-alert';
import { loadUser } from '../../Actions/User';
import defaultImage from "../../assets/default_image.png"

const NewPost = () => {

    const[image,setImage]=useState(defaultImage);
    const [caption,setCaption]=useState("");

    const {loading,error,message} = useSelector((state)=>state.like)

    const dispatch = useDispatch();

    const alert = useAlert();
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        
        Reader.readAsDataURL(file);
        Reader.onload=(e)=>{
            if(Reader.readyState === 2){
                console.log(Reader.result);
                setImage(Reader.result);
            }
        }
    }

    const handleCreatePost =async (e)=>{
        e.preventDefault();

        await dispatch(createPost(caption,image))

        dispatch(loadUser());

    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message){
            alert.success(message);
            dispatch({type:"clearMessage"})
        }
    },[error,message,alert,dispatch])

  return (
    <div className="newPost">
        <form className='newPostForm' onSubmit={handleCreatePost}>
            <p className="newPostHeader">New Post</p>

            
            {image && <img src={image} alt="post" /> }

            <input type="file" accept='image/*' onChange={handleImageChange}/>

            <input type="text" placeholder='caption' value={caption} onChange={(e)=>setCaption(e.target.value)}/>

            <button className='postButton' disabled={loading} type="submit">Post</button>

        </form>
    </div>
  )
}

export default NewPost

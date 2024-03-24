import React, { useEffect, useState } from 'react'
import "./NewPost.css"
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../Actions/post';

import { loadUser } from '../../Actions/User';
import defaultImage from "../../assets/default_image.png"

import { requestStart, requestSuccess, requestFailure } from '../../redux/requestSlice'
import { LoginSuccess } from '../../redux/userSlice';

const NewPost = () => {

    const[image,setImage]=useState(defaultImage);
    const [caption,setCaption]=useState("");

    const {loading,error,message} = useSelector((state)=>state.requests)

    const dispatch = useDispatch();

 
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

        dispatch(requestStart())

        const res = await createPost(caption,image)
        console.log(res);

        if(res.success){
            dispatch(requestSuccess(res.message));
        }else{
            dispatch(requestFailure(res.data.message))
        }

        const data = await loadUser();
        dispatch(LoginSuccess(data.user))

    }

    // useEffect(()=>{
    //     if(error){
       
    //         dispatch({type:"clearErrors"});
    //     }
    //     if(message){
         
    //         dispatch({type:"clearMessage"})
    //     }
    // },[error,message,dispatch])

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

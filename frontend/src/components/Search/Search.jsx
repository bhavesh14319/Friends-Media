import React from 'react'
import "./Search.css"
// import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import User from '../User/User';

const Search = () => {

    const [query,setQuery]= useState("");

    let {users:allUsers, loading:usersLoading} = useSelector((state)=>state.allusers);

    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();

        dispatch(getAllUsers(query));
    }


    // useEffect(()=>{
    //     if(query===""){
    //         allUsers=null
    //     }
    // },[query])

  return (
        <div className='search'>
                    <form className='searchForm' onSubmit={handleSubmit}>
                        <p className='loginHeader' style={{paddingTop:"15px"}}>
                            Friends Media
                        </p>

                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Enter your name' />
                       


                        <button className='searchBtn' disabled={usersLoading} type='submit'>Search</button>
                        <div className="searchResults">
                        {
                            allUsers && allUsers.map((user)=>(
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    avatar={user.avatar.url}

                                />
                            ))
                        }
                    </div>
                    </form>

                    
                </div>
  )
}

export default Search

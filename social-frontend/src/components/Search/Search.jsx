import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Home/SideBar';
import RightBar from '../Home/RightBar';
import SearchContainer from './SearchContainer';
import { Box, Stack } from '@mui/material';


const Search = ({ }) => {

    const dispatch = useDispatch();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     dispatch(allUsersRequest());

    //     const res = await getAllUsers(query);

    //     if (res.success) {
    //         dispatch(allUsersSuccess(res.users))
    //     } else {
    //         dispatch(allUsersFailure(res.data.message))
    //     }


    // }


    return (
        <Box>
        <Stack direction="row" spacing={2} justifyContent="space-between"> 
            <SideBar/>
            <SearchContainer />
            <RightBar/>
           
        </Stack>
      
    </Box>
    )
}

export default Search;

import React from 'react';
import SideBar from '../Home/SideBar';
import RightBar from '../Home/RightBar';
import SearchContainer from './SearchContainer';
import { Box, Stack } from '@mui/material';


const Search = () => {
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

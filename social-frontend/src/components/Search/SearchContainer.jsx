import { Box, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListUser from '../User/ListUser'
import { searchUsers } from '../../Actions/User';
import { Search } from '@mui/icons-material';
import SearchedUserShimmer from '../Shimmer/SearchedUserShimmer';





const shimmer = [
    <SearchedUserShimmer />,
    <SearchedUserShimmer />,
    <SearchedUserShimmer />,
    <SearchedUserShimmer />,
    <SearchedUserShimmer />
]




const SearchContainer = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedusers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (searchText !== "") {
            setLoading(true);
            let res = await searchUsers(searchText);
            if (res.success) {
                console.log(res);
                setLoading(false);
                setSearchedUsers(res.users);
            }
        }
    }

    useEffect(() => {
        if (searchText === "") {
            setSearchedUsers([])
            setLoading(false);
        }
    }, [searchText])


    return (
        <Box sx={{ borderRight: "1px solid #707070", marginLeft: "0px !important", padding: { xs: "1em 1em", md: "2em 1em", lg: "2em 2em" } }} flex={3} marginLeft={0}>
            <Typography variant='h5' >Search </Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <TextField required value={searchText} onChange={(e) => setSearchText(e.target.value)} fullWidth placeholder='Search' id="fullWidth" sx={{ m: "20px 0px", mr: "10px", display: "inline-block" }} inputProps={{ style: { padding: "10px" } }} />

                <IconButton onClick={handleSearch}>
                    <Search />
                </IconButton>
            </Stack>
            <Divider sx={{ marginBottom: "20px" }} />


            {loading &&
                shimmer?.map((shimmer) => (
                    shimmer
                ))
            }




            <Box sx={{ height: "100%" }}>
                {!loading &&
                    <Stack direction="column" sx={{ width: "80%", margin: "0 auto" }}>
                        {searchedusers?.map((user) => (
                            <ListUser userId={user._id} name={user.name} avatar={user.avatar.url} isSearched={true} followers={user.followers} />
                        ))}

                    </Stack>
                }
            </Box>

        </Box>
    )
}

export default SearchContainer

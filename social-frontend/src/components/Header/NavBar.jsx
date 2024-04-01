import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { AddRounded, Home, Search, } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { openCreatePostModal } from '../../redux/createPostSlice';
import { openAuthModal } from '../../redux/AuthSlice';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';




const drawerWidth = 240;

const NavBar = (props) => {

    const dispatch = useDispatch();
    const { isAuthenticated, authorizedUser: user } = useSelector((state) => state.authStates);
    const { postsLoading } = useSelector((state) => state.feedStates)
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleCreatePost = () => {
        if (isAuthenticated) {
            dispatch(openCreatePostModal())
        } else {
            Swal.fire({
                title: "Please Login First",
                text: "Note: dummy login credentials are provided",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(openAuthModal())
                }
            });
        }
    }


    const handleAvatarClick = () => {
        Swal.fire({
            title: "Please Login First",
            text: "Note: dummy login credentials are provided",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(openAuthModal())
            }
        });
    }



    const navItems = [
        <Link to="/"> <ListItem> <ListItemIcon><Home /></ListItemIcon> <ListItemText primary="Home"></ListItemText> </ListItem></Link>,
        <Link to="/search"> <ListItem><ListItemIcon><Search /></ListItemIcon> <ListItemText primary="Search"></ListItemText></ListItem></Link>,
        <ListItem onClick={handleCreatePost}><ListItemIcon ><AddRounded sx={{ border: "3px solid #707070", borderRadius: "5px" }} /></ListItemIcon> <ListItemText primary="Create"></ListItemText> </ListItem>,

        isAuthenticated ?
            <Link to={`/profile/`}> <ListItem><ListItemIcon sx={{marginLeft:"2px"}}><Avatar sx={{ height: "1.25em", width: "1.25em" }} /></ListItemIcon> <ListItemText primary="Profile"></ListItemText> </ListItem> </Link>
            :
            <ListItem onClick={handleCreatePost}><ListItemIcon><Avatar sx={{ height: "1.25em", width: "1.25em" }} /></ListItemIcon> <ListItemText primary="Profile"></ListItemText> </ListItem>


    ];





    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Friends Media
            </Typography>
            <Divider />
            <List>
                {
                    navItems?.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))
                }

            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            <AppBar component="nav" sx={{ bgcolor: "#f2f2f2" }} position='sticky'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: "black" }} />
                    </IconButton>



                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "black", flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Friends Media
                    </Typography>

                    {
                        isAuthenticated? 
                        <Typography sx={{ ml: "auto", color: "black" }}>Hello, {user ? user.name : "guest"} 👋</Typography>
                        :
                        <Button onClick={()=>dispatch(openAuthModal())} sx={{ml:"auto"}}>Login</Button>
                    }
                    
                    {isAuthenticated ?
                        <Link to={`/profile/`}>
                            <IconButton >
                                <Avatar src={user && user?.avatar?.url} sx={{}} />
                            </IconButton>
                        </Link>

                        :
                        <IconButton onClick={handleAvatarClick} >
                            <Avatar src={user && user?.avatar?.url} sx={{}} />
                        </IconButton>
                    }

                </Toolbar>
                {postsLoading &&
                    <LinearProgress sx={{
                        backgroundColor: 'white',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: 'red'
                        }
                    }} />
                }
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </>
    )
}

export default NavBar

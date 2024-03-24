import { AppBar, Avatar, Box, Divider, Drawer, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { AddRounded, Home, Search, } from '@mui/icons-material';
import { useSelector } from 'react-redux';


const drawerWidth = 240;
const navItems = [
    <ListItem><ListItemIcon><Home /></ListItemIcon> <ListItemText primary="Home"></ListItemText> </ListItem>,
    <ListItem><ListItemIcon><Search /></ListItemIcon> <ListItemText primary="Search"></ListItemText> </ListItem>,
    <ListItem><ListItemIcon ><AddRounded sx={{ border: "3px solid #707070", borderRadius: "5px" }} /></ListItemIcon> <ListItemText primary="Create"></ListItemText> </ListItem>,
    <ListItem><ListItemIcon><Avatar sx={{ height: "1em", width: "1em" }} /></ListItemIcon> <ListItemText primary="Profile"></ListItemText> </ListItem>
];
const NavBar = (props) => {

    const { postsLoading } = useSelector((state) => state.feedStates)
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const { authorizedUser: user } = useSelector((state) => state.authStates);

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
                    navItems?.map((item,index) => (
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
                        <MenuIcon />
                    </IconButton>



                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "black", flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Friends Media
                    </Typography>


                    <Typography sx={{ color: "black" }}>Hello, {user ? user.name : "guest"} 👋</Typography>
                    <IconButton sx={{ ml: "auto" }}>
                        <Avatar src={user && user?.avatar?.url} sx={{}} />
                    </IconButton>
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

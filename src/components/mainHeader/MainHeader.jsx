import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Box,
    AppBar,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloudIcon from '@mui/icons-material/Cloud';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 200;

function MainHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawerButtons = [
        { name: 'Home', link: '/', icon: <HomeIcon /> },
        { name: 'Favorite', link: '/favorite', icon: <FavoriteIcon /> },
        { name: 'Add location', link: '/add', icon: <AddIcon /> }
    ]

    const drawer = (
        <>
            <List>
                {drawerButtons.map((item, i) => (
                    <ListItem button component={Link} to={item.link} onClick={handleDrawerToggle} key={i}>
                        <ListItemIcon >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    ml: { md: `${drawerWidth}px` },
                    zIndex: (theme) => ({ lg: theme.zIndex.drawer + 1 })
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <CloudIcon sx={{ mr: 1 }}></CloudIcon>
                    <Typography variant="h6" noWrap component="div">
                        Weather
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar />
                    {drawer}
                </Drawer>
            </Box >
        </ >
    );
}

export default MainHeader;

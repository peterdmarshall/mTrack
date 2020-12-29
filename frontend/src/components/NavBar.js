import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Grid, Typography, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LogoutButton } from './LogoutButton';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    navBar: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
    },
    menuButton: {
        marginRight: '50px',
        color: '#FFFFFF'
    },
    title: {
        flexGrow: 1,
    }
});

function NavBar(props) {

    const { board, user } = props;
    const history = useHistory();
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    }

    const redirectToHome = () => {
        history.push('/');
    }

    const logout = () => {
        history.push('/login')
    }

    const loadUserProfile = () => {
        // Redirect to User Profile Page (TODO)
    }

    if(!user) {
        handleUserMenuClose();
    }

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.navBar}>
                <Toolbar>
                    <IconButton 
                        onClick={redirectToHome} 
                        edge="start" 
                        classname={classes.menuButton} 
                        aria-label="home"
                        color="inherit"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        mTrack
                    </Typography>
                    <IconButton
                        edge="end" 
                        onClick={handleUserMenuOpen} 
                        aria-label="user-menu"
                        aria-controls="menuId"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id="menuId"
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={handleUserMenuClose}
                >
                    <MenuItem onClick={() => loadUserProfile()}>Profile</MenuItem>
                    <LogoutButton type="menuItem" />
                </Menu>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };
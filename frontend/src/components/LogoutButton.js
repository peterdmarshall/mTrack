import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../actions/user.actions';

import { Button, IconButton, MenuItem } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LogoutButton(props) {
    const { dispatch, type } = props;
    const history = useHistory();

    const handleClick = () => {
        dispatch(userActions.logout());
        history.push("/login");
    }

    return (
        <div>
            {(type === 'icon') &&
                <IconButton onClick={() => handleClick()}>
                    <ExitToAppIcon />
                </IconButton>
            }
            {(type === 'button') &&
                <Button 
                    variant="contained"
                    onClick={() => handleClick()}
                >Log Out</Button>
            }
            {(type === 'menuItem') &&
                <MenuItem onClick={() => handleClick()}>Log Out</MenuItem>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        
    };
}

const connectedLogoutButton = connect(mapStateToProps)(LogoutButton);
export { connectedLogoutButton as LogoutButton };
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Card, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { boardActions } from '../actions/board.actions';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    card: {
        background: '#d9d9d9',
        margin: '2%',
    },
    cardHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
        height: '3vh'
    },
    cardContent: {
        height: '10vh',
        minHeight: '20px'
    }
});

function BoardCard(props) {

    const { dispatch, board, user } = props;
    const history = useHistory();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const loadBoard = () => {
        history.push('/board');
        dispatch(boardActions.get(board.id, user));
        console.log(board.id);
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    }

    const editBoard = (boardId) => {

    }

    const deleteBoard = (boardId) => {
        dispatch(boardActions.remove(boardId, user));
        handleMenuClose();
    }

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card className={classes.card}>
                <CardHeader 
                    title={board.name}
                    titleTypographyProps={{variant:'subtitle1'}}
                    className={classes.cardHeader}
                    action={
                        <IconButton onClick={handleMenuOpen} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />
                <CardActionArea onClick={() => loadBoard(board.id)}>
                <CardContent className={classes.cardContent}>
                    <Typography>
                        {board.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="menuId"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => editBoard(board.id)}>
                    <EditIcon />
                </MenuItem>
                <MenuItem onClick={() => deleteBoard(board.id)}>
                    <DeleteIcon />
                </MenuItem>
            </Menu>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedBoardCard = connect(mapStateToProps)(BoardCard);
export { connectedBoardCard as BoardCard };
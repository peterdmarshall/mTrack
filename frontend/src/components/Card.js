import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Menu, MenuItem, TextField, Card as MuiCard, GridListTile, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/column.actions';
import { cardActions } from '../actions/card.actions';

import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {

    },
    cardContent: {
        minHeight: '1.5vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        background: '#FFFFFF',
        margin: '2%',
        borderRadius: '3px'
    },
});

function Card(props) {
    const { dispatch, columnId, user, board, card, provided, innerRef } = props;
    const classes = useStyles();

    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setTitle(card.title);
        setDescription(card.description);
    }

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        setDescription(value);
    }

    const updateCard = () => {
        if(title !== '') {
            dispatch(cardActions.update(title, description, card.position, board.id, columnId, card.id, user));
        }
        setOpen(false);
    }

    const deleteCard = () => {
        dispatch(cardActions.remove(board.id, columnId, card.id, user));
        setOpen(false);
    }

    return (
        <div 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={innerRef}>
            <CardActionArea onClick={handleOpen}>
                <CardContent className={classes.cardContent}>
                    {title}
                </CardContent>
            </CardActionArea>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        label="Card Title"
                        variant="filled"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="filled"
                        multiline
                        fullWidth
                        rows={4}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteCard}>
                        Delete
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCard} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>        
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { board } = state.board;
    const { user } = authentication;
    return {
        user,
        board
    };
}

const connectedCard = connect(mapStateToProps)(Card);
export { connectedCard as Card };
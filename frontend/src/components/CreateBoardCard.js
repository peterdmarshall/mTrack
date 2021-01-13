import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CircularProgress, CardContent, CardActionArea, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { boardActions } from '../actions/board.actions';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    card: {
        background: '#d9d9d9',
        margin: '2%'
    },
    cardHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)'
    },
    cardContent: {
        height: '5vh',
        minHeight: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContentItem: {
        margin: '1%'
    }
});

function CreateBoardCard(props) {

    const { dispatch, user, creatingBoard } = props;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();
    const classes = useStyles();

    const content = "Create New Board";

    const createBoard = () => {
        dispatch(boardActions.create(name, description, user));
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setName('');
        setDescription('');
    }

    const handleNameChange = (e) => {
        const { value } = e.target;
        setName(value);
    }

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        setDescription(value);
    }

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleOpen}>
                { !creatingBoard &&
                <CardContent className={classes.cardContent}>
                    <AddIcon className={classes.cardContentItem}></AddIcon>
                    <Typography className={classes.cardContentItem}>
                        {content}
                    </Typography>
                </CardContent>
                }
                { creatingBoard && 
                <CardContent className={classes.cardContent}>
                    <CircularProgress className={classes.cardContentItem}/>
                </CardContent>
                }
                </CardActionArea>
            </Card>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            To create a new board, please enter a name for your board and a short description.
                        </Typography>
                    </DialogContentText>
                    <TextField
                        id="name"
                        label="Board Name"
                        variant="filled"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createBoard} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { creatingBoard } = state.board;
    return {
        user,
        creatingBoard,
    };
}

const connectedCreateBoardCard = connect(mapStateToProps)(CreateBoardCard);
export { connectedCreateBoardCard as CreateBoardCard };
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardActionArea, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function BoardListItem(props) {

    const { board } = props;
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const content = "Create New Board";

    const createBoard = () => {
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleOpen}>
                <CardContent className={classes.cardContent}>
                    <AddIcon className={classes.cardContentItem}></AddIcon>
                    <Typography className={classes.cardContentItem}>
                        {content}
                    </Typography>
                </CardContent>
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
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="filled"
                        multiline
                        fullWidth
                        rows={4}
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
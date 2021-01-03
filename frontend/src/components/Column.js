import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, TextField, Card, GridListTile, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/column.actions';
import { cardActions } from '../actions/card.actions';
import { Card as ColumnCard } from './Card';

import { useDrop } from 'react-dnd';

import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    column: {
        background: '#d9d9d9',
        margin: '2vh 0.5vw',
        width: '15vw',
        minWidth: '300px',
    },
    card: {
        background: '#d9d9d9',
        height: '100%'
    },
    columnHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
        height: '3vh',
        position: 'relative'
    },
    columnContent: {
        height: '10vh',
        minHeight: '20px',
    },
    cardContent: {
        height: '5vh',
        minHeight: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        margin: '2%',
        borderRadius: '3px'
    },
    cardContentItem: {
        margin: '1%'
    },
    editTitleField: {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '3px',
    },
    input: {
        color: 'rgba(255, 255, 255, 1)',
    },
    createCardTextField: {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '3px',
    },
    createCardContent: {
        background: '#FFFFFF',
        margin: '2%',
        borderRadius: '3px'
    }
});

function Column(props) {

    const { dispatch, column, user, board, cards, newCard, updatedCard, removedCard, allowedDropEffect } = props;

    const columnCards = cards ? cards[column.id.toString()] : [];

    const classes = useStyles();
    
    // State for edit column title
    const [editingTitle, setEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    // State for column menu
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // State for create card
    const [creatingCard, setCreatingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');

    // Drag and drop
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'card',
        drop: () => ({
            id: column.id,
            allowedDropEffect,
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = canDrop && isOver;

    const content = "Add Card"

    useEffect(() => {
        dispatch(cardActions.getAll(board.id, column.id, user));
    }, [board.id, column.id, newCard, updatedCard, removedCard]);

    const deleteColumn = () => {
        dispatch(columnActions.remove(board.id, column.id, user));
        handleMenuClose();
    }

    const editTitle = () => {
        setEditedTitle(column.title);
        setEditingTitle(true);
    }

    const handleEditedTitleChange = (e) => {
        const { value } = e.target;
        setEditedTitle(value);
    }

    const closeEditTitle = () => {
        if(editedTitle !== column.title) {
            updateTitle();
        } else {
            setEditingTitle(false);
            setEditedTitle('');
        }
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    }

    const updateTitle = () => {
        if(editedTitle !== '' && editedTitle !== column.title) {
            dispatch(columnActions.update(editedTitle, board.id, column.id, user));
        }
        setEditingTitle(false);
        setEditedTitle('');
    }

    const createCard = () => {
        console.log('create card');
        if(newCardTitle !== '') {
            dispatch(cardActions.create(newCardTitle, '', board.id, column.id, user));
        }
        closeCreateCard();
    }

    const handleNewCardTitleChange = (e) => {
        const { value } = e.target;
        setNewCardTitle(value);
    }

    const closeCreateCard = () => {
        setCreatingCard(false);
        setNewCardTitle('');
    }

    const openCreateCard = () => {
        setCreatingCard(true);
    }

    return (
        <GridListTile key={column.id} className={classes.column}>
            <Card className={classes.card} ref={drop}>
                { !editingTitle &&
                    <CardHeader 
                        title={
                            <CardActionArea onClick={editTitle}>
                                <Typography>
                                    {column.title}
                                </Typography>
                            </CardActionArea>
                        }
                        titleTypographyProps={{variant:'subtitle1'}}
                        className={classes.columnHeader}
                        action={
                            <IconButton onClick={handleMenuOpen} aria-label="options">
                                <MoreVertIcon />
                            </IconButton>
                        }
                    />
                
                }
                { editingTitle &&
                    <CardHeader
                        className={classes.columnHeader}
                        avatar={
                            <form name="form" onSubmit={updateTitle}>
                                <TextField 
                                    value={editedTitle}
                                    onChange={handleEditedTitleChange}
                                    variant="filled"
                                    className={classes.editTitleField}
                                    onBlur={closeEditTitle}
                                    autoFocus
                                    size="small"
                                    InputProps={{
                                        className: classes.input
                                    }}
                                />
                            </form>
                        }
                        action={
                            <IconButton onClick={handleMenuOpen} aria-label="options">
                                <MoreVertIcon />
                            </IconButton>
                        }
                    />
                }
                { columnCards && columnCards.map(card => {
                    return (
                        <ColumnCard key={card.id} columnId={column.id} card={card}/>
                    );
                })}
                { !creatingCard &&
                <CardActionArea onClick={openCreateCard}>
                    <CardContent className={classes.cardContent}>
                        <AddIcon className={classes.cardContentItem}></AddIcon>
                        <Typography className={classes.cardContentItem}>
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                }
                { creatingCard &&
                    <CardContent className={classes.createCardContent}>
                        <form onSubmit={createCard}>
                            <TextField 
                                value={newCardTitle}
                                onChange={handleNewCardTitleChange}
                                variant="standard"
                                className={classes.createCardTextField}
                                onBlur={closeCreateCard}
                                autoFocus
                                fullWidth
                                size="small"
                            />
                            <Button>

                            </Button>
                        </form>
                    </CardContent>
                }
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
                <MenuItem onClick={() => deleteColumn()}>
                    <Typography>
                        Delete
                    </Typography>
                    <DeleteIcon />
                </MenuItem>
            </Menu>
        </GridListTile>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { board } = state.board;
    const { user } = authentication;
    const { cards, updatedCard, removedCard } = state.card;
    const newCard = state.card.card;
    return {
        user,
        board,
        cards,
        newCard,
        updatedCard,
        removedCard
    };
}

const connectedColumn = connect(mapStateToProps)(Column);
export { connectedColumn as Column };
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, GridListTile, CardHeader, CardContent, CardActionArea, CardActions, Typography, IconButton, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/column.actions';
import { cardActions } from '../actions/card.actions';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    column: {
        background: '#FFFFFF',
        margin: '2vh 0.5vw',
        width: '12vw',
        minWidth: '250px',
    },
    cardContent: {
        height: '5vh',
        minHeight: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
    },
    cardContentItem: {
        margin: '1%'
    },
    inputField: {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '3px',
    },
    input: {
        color: 'rgba(255, 255, 255, 1)',
    },
    createColumn: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
    },
    createButton: {
        color: '#FFFFFF',
        borderStyle: 'solid',
        borderWidth: '2px',
    },
    cancelButton: {
        color: '#FFFFFF',
        borderStyle: 'solid',
        borderWidth: '2px',
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: '0 0.4vw'
    }
});

function CreateColumnButton(props) {

    const { dispatch, user, board } = props;
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [columnName, setColumnName] = useState('');
    const [columnNameError, setColumnNameError] = useState(false);

    const content = "New Column";

    const handleClick = () => {
        setClicked(!clicked);
        setColumnName('');
        setColumnNameError(false);
    }

    const handleColumnNameChange = (e) => {
        const { value } = e.target;
        setColumnName(value);
    }

    const createColumn = () => {
        setColumnNameError(false);
        if(columnName && columnName !== '') {
            dispatch(columnActions.create(columnName, board.id, user));
        } else {
            setColumnNameError(true);
        }
    }

    return (
        <GridListTile className={classes.column}>
            <Card>
                { !clicked &&
                <CardActionArea onClick={handleClick}>
                    
                    <CardContent className={classes.cardContent}>
                        <AddIcon className={classes.cardContentItem}></AddIcon>
                        <Typography className={classes.cardContentItem}>
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                }
                { clicked && 
                    <div className={classes.createColumn}>
                        <form onSubmit={createColumn}>
                            <CardContent>
                                <TextField
                                    label="Column title"
                                    error={columnNameError}
                                    helperText={columnNameError ? 'Title is required' : ''}
                                    value={columnName}
                                    onChange={handleColumnNameChange}
                                    variant="filled"
                                    className={classes.inputField}
                                    autoFocus
                                    InputProps={{
                                        className: classes.input
                                    }}
                                    InputLabelProps={{
                                        className: classes.input
                                    }}
                                />
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                                <Button className={classes.createButton} type="submit">Add Column</Button>
                                <IconButton className={classes.cancelButton} onClick={handleClick} size='small'>
                                    <CloseIcon />
                                </IconButton>
                            </CardActions>
                        </form>
                    </div>
                }   
            </Card>
        </GridListTile>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { board } = state.board;
    return {
        user,
        board
    };
}

const connectedCreateColumnButton = connect(mapStateToProps)(CreateColumnButton);
export { connectedCreateColumnButton as CreateColumnButton };
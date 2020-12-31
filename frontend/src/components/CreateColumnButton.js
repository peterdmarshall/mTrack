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
        alignItems: 'center'
    },
    cardContentItem: {
        margin: '1%'
    },
    inputField: {

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
    }

    const handleColumnNameChange = (e) => {
        const { value } = e.target;
        setColumnName(value);
    }

    const createColumn = () => {
        if(columnName && columnName !== '') {
            dispatch(columnActions.create(columnName, board.id, user));
            handleClick();
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
                    <div>
                        <CardContent>
                            <TextField
                                label="Column name"
                                error={columnNameError}
                                helperText={columnNameError ? 'Name is required' : ''}
                                value={columnName}
                                onChange={handleColumnNameChange}
                                variant="filled"
                                className={classes.inputField}
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={createColumn}>Add Column</Button>
                            <IconButton onClick={handleClick}>
                                <CloseIcon />
                            </IconButton>
                        </CardActions>
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
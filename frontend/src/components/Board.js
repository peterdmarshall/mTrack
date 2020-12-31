import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Divider, List, ListItem, Button, Paper, TextField, CircularProgress, Container, Grid, Box, Typography } from '@material-ui/core';

import { columnActions } from '../actions/column.actions';
import { boardActions } from '../actions/board.actions';

const useStyles = makeStyles({
    root: {

    },
});

function Board(props) {

    const { dispatch, user, board, columns, loadingBoard } = props;
    const history = useHistory();
    const classes = useStyles();
    const boardId = props.history.location.state?.boardId;

    useEffect(() => {
        dispatch(boardActions.get(boardId, user));
    }, [boardId]);

    if(!user) {
        history.push('/login');
    }

    if(loadingBoard) {
        return <p>Loading...</p>
    }

    return (
        <div>
            { board &&
                <h1>{board.name}</h1>
            }
        </div>
    );
}


const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { board, loadingBoard } = state.board;
    const { columns } = state.column;
    return {
        user,
        board,
        loadingBoard,
        columns
    };
}

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };
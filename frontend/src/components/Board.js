import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Paper } from '@material-ui/core';

import { columnActions } from '../actions/column.actions';
import { boardActions } from '../actions/board.actions';

import { Column } from './Column';
import { CreateColumnButton } from './CreateColumnButton';

const useStyles = makeStyles({
    paper: {
        marginTop: '1vh',
        overflowX: 'auto',
        height: '100%'
    },
});

function Board(props) {

    const { dispatch, user, board, columns, column, loadingBoard } = props;
    const history = useHistory();
    const classes = useStyles();
    const boardId = props.history.location.state?.boardId;

    useEffect(() => {
        dispatch(boardActions.get(boardId, user));
    }, [boardId]);

    useEffect(() => {
        dispatch(columnActions.getAll(boardId, user));
    }, [column])

    if(!user) {
        history.push('/login');
    }

    if(loadingBoard) {
        return <p>Loading...</p>
    }

    return (
        <Paper className={classes.paper}>
            <Grid container position="row" wrap="nowrap">
                { columns && columns.map((column) => {
                    return <Column column={column}></Column>
                })}
                <CreateColumnButton />
            </Grid>
        </Paper>
    );
}


const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { board, loadingBoard } = state.board;
    const { columns, column } = state.column;
    return {
        user,
        board,
        loadingBoard,
        columns,
        column
    };
}

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };
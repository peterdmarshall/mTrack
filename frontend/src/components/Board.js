import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, Box, Typography, Paper } from '@material-ui/core';

import { columnActions } from '../actions/column.actions';
import { boardActions } from '../actions/board.actions';

import { Column } from './Column';
import { CreateColumnButton } from './CreateColumnButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        height: '90vh'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This costs memory but helps keep high FPS.
        transform: 'translateZ(0)',
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
    }, [column]);

    if(!user) {
        history.push('/login');
    }

    if(loadingBoard) {
        return <p>Loading...</p>
    }

    return (
        <div className={classes.root}>
            <GridList cols={5} className={classes.gridList}>
                { columns && columns.map((column) => {
                    return <Column column={column}></Column>
                })}
                <CreateColumnButton />
            </GridList>
        </div>
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
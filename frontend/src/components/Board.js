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
        justifyContent: 'left',
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

    const { dispatch, user, board, columns, updatedColumn, loadingBoard, removedColumn, createdColumn } = props;
    const history = useHistory();
    const classes = useStyles();


    useEffect(() => {
        if(board) {
            dispatch(boardActions.get(board.id, user));
        }
    }, []);

    useEffect(() => {
        if(board) {
            dispatch(columnActions.getAll(board.id, user));
        }
    }, [updatedColumn, removedColumn, createdColumn, board]);

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
                    return <Column key={column.id} column={column}></Column>
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
    const { columns, updatedColumn, removedColumn, createdColumn } = state.column;
    return {
        user,
        board,
        loadingBoard,
        columns,
        updatedColumn,
        removedColumn,
        createdColumn,
    };
}

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };
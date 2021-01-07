import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { boardActions } from '../actions/board.actions';
import { BoardCard } from './BoardCard';
import { CreateBoardCard } from './CreateBoardCard';
import { Grid } from '@material-ui/core';


function BoardCardGrid(props) {

    const { dispatch, user, boards, board, loadingBoards } = props;

    useEffect(() => {
        dispatch(boardActions.getAll(user));
    }, [board]);

    return (
        <Grid container >
            { loadingBoards && <p>Loading boards...</p>}
            { boards && boards.map((board) => {
                return <BoardCard key={board.id} board={board}></BoardCard>
            })}
            <CreateBoardCard />
        </Grid >
    );

}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { boards, loadingBoards, board } = state.board;
    return {
        user,
        boards,
        loadingBoards,
        board
    };
}

const connectedBoardCardGrid = connect(mapStateToProps)(BoardCardGrid);
export { connectedBoardCardGrid as BoardCardGrid };
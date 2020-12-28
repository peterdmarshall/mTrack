import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { boardActions } from '../actions/board.actions';
import BoardListItem from './BoardListItem';
import { List } from '@material-ui/core';


function BoardList(props) {

    const { dispatch, user, boards, loadingBoards } = props;
    const history = useHistory();

    useEffect(() => {
        dispatch(boardActions.getAll(user));
    }, []);

    return (
        <List>
            { loadingBoards && <p>Loading boards...</p>}
            { boards && boards.map((board) => {
                return <BoardListItem board={board}></BoardListItem>
            })}
        </List>
    );

}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { boards, loadingBoards } = state.board;
    return {
        user,
        boards,
        loadingBoards
    };
}

const connectedBoardList = connect(mapStateToProps)(BoardList);
export { connectedBoardList as BoardList };
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { boardActions } from '../actions/board.actions';

function Board(props) {

    const { dispatch, user, board, loadingBoard } = props;
    const history = useHistory();
    const boardId = props.history.location.state?.boardId;

    useEffect(() => {
        dispatch(boardActions.get(boardId, user));
    }, [boardId]);

    if(!user) {
        history.push('/login');
    }

    return (
        <div>
            { loadingBoard && <p>Loading...</p>}
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
    return {
        user,
        board,
        loadingBoard
    };
}

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';
import { boardActions } from '../actions/board.actions';

function HomePage(props) {
    const { dispatch, user, boards, loadingBoards } = props;
    const history = useHistory();

    useEffect(() => {
        dispatch(boardActions.getAll(user));
    }, []);

    if(!user) {
        history.push('/login');
    }

    return (
        <div>
            <h1>Hi {user.email}! </h1>
            <h3>User Boards:</h3>
            <ul>
                { loadingBoards && <p>Loading boards...</p>}
                { boards && boards.map((board) => {
                    return (
                    <li>
                        <p>Id: {board.id}</p>
                        <p>Name: {board.name}</p>
                    </li>
                    )
                })}
            </ul>
            <p>
                <Link onClick={() => dispatch(userActions.logout())} to="/login">Logout</Link>
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { boards, loadingBoards } = state.boards;
    return {
        user,
        boards,
        loadingBoards
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

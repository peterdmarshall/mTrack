import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardList } from './BoardList';

import { userActions } from '../actions/user.actions';

function Home(props) {
    const { dispatch, user } = props;
    const history = useHistory();

    if(!user) {
        history.push('/login');
    }

    return (
        <div>
            <h1>Hi {user.email}! </h1>
            <h3>Board List: </h3>
            <BoardList />
            <p>
                <Link onClick={() => dispatch(userActions.logout())} to="/login">Logout</Link>
            </p>
        </div>
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

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };

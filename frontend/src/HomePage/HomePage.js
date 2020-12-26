import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

function HomePage(props) {
    const { dispatch, user } = props;

    useEffect(() => {
        
    }, [dispatch]);

    return (
        <div>
            <h1>Hi {user.email}! </h1>
            <p>
                <Link onClick={() => dispatch(userActions.logout())} to="/login">Logout</Link>
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

function HomePage(props) {
    const { dispatch, user, users } = props;

    useEffect(() => {
        dispatch(userActions.getAll());
    }, [dispatch]);

    return (
        <div>
            <h1>Hi {user.email}! </h1>
            <h3>List of Users: </h3>
            {users.loading && <em>Loading users..</em>}
            {users.error && <span>ERROR: {users.error}</span>}
            {users.items && 
                <ul>
                    {users.items.map((user, index) =>
                        <li key={user.id}>
                            {'Email: ' + user.email}
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

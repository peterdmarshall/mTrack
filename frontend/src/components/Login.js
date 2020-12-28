import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userActions } from '../actions/user.actions';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const { dispatch, loggingIn, loggedIn } = props;

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if(email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    if(loggedIn) {
        history.push('/');
    }

    return (
        <div>
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmailChange} />
                    { submitted && !email &&
                        <div>Email is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                    { submitted && !password &&
                        <div>Password is required</div>
                    }
                </div>
                <div>
                    <button type="submit">Login</button>
                    { loggingIn &&
                        <p>Logging In ...</p>
                    }
                </div>
            </form>
        </div>

    );
}

const mapStateToProps = (state) => {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
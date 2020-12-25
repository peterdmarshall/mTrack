import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const { dispatch, loggingIn } = props;

    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

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
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
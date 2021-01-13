import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, Button, Paper, TextField, CircularProgress, Container, Grid, Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { userActions } from '../actions/user.actions';

const useStyles= makeStyles({
    root: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        minHeight: '100vh',
    },
    paper: {
        position: 'relative',
        minWidth: '300px',
        width: '50vw',
        maxWidth: '500px',
        minHeight: '500px',
        height: '45vh',
        marginTop: '10vw',
        paddingTop: '5vh',
        paddingBottom: '5vh'
    },
    inputField: {
        minHeight: '60px',
        minWidth: '200px',
        width: '35vw',
        maxWidth: '350px',
        marginBottom: '1vh'
    },
    loginButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        minHeight: '60px',
        minWidth: '200px',
        maxWidth: '350px',
        height: '5vh',
        width: '35vw',
        padding: '0 30px',
    },
    links: {
        position: 'absolute',
        bottom: '3vh',
        marginTop: '6vh'
    },
    failureAlert: {
        margin: '2% 0'
    }
});

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    const { dispatch, loggingIn, loggedIn, loginFailed } = props;

    useEffect(() => {
        dispatch(userActions.clearLogin());
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
        } else if (password) {
            setEmailError(true);
        } else if (email) {
            setPasswordError(true);
        } else {
            setEmailError(true);
            setPasswordError(true);
        }
    }

    const loginDemoUser = () => {
        // Login with a demo user that has populated example data
    }

    if(submitted && loginFailed) {
        setPasswordError(false);
        setEmailError(false);
        setPassword('');
        setSubmitted(false);
    }

    if(loggedIn) {
        history.push('/');
    }

    return (
        <Box className={classes.root}>
        <Container>
            <Grid container justify="center">
            <Paper elevation={0} className={classes.paper}>
                <Grid container justify="center">
                    <Grid container item xs={9} spacing={3} direction="column">
                        <Grid item container justify="center">
                            <Typography variant="h2">mTrack</Typography>
                        </Grid>
                        <Grid item container justify="center">
                            <Typography variant="h4">Login</Typography>
                        </Grid>
                        <Grid item>
                        <form name="form" onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    id="email-field"
                                    label="Email"
                                    error={emailError}
                                    helperText={emailError ? 'Email is required' : ''}
                                    value={email}
                                    onChange={handleEmailChange}
                                    variant="filled"
                                    className={classes.inputField}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password-field"
                                    type="password"
                                    label="Password"
                                    error={passwordError}
                                    helperText={emailError ? 'Password is required' : ''}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    variant="filled"
                                    className={classes.inputField}
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                            name="rememberMe"
                                            color="primary"
                                        />
                                    }
                                    label="Remember Me"
                                />
                            </div>
                            <div>
                                {!loggingIn && <Button className={classes.loginButton} type="submit">Login</Button>}
                                { loggingIn && <CircularProgress />}
                            </div>
                            { loginFailed && <Alert className={classes.failureAlert} severity="error">Login Failed: Incorrect email or password</Alert> }
                        </form>
                        <Grid container justify="center">
                            <Grid item className={classes.links}>
                                <Typography>
                                    Don't have an account?
                                    <Link to="/signup">Sign Up here.</Link>
                                </Typography>
                                <Typography>
                                    Just visiting?
                                    <Link to="/" onClick={() => loginDemoUser()}>Log in as a demo user.</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        </Container>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const { loggingIn, loggedIn, loginFailed } = state.authentication;
    return {
        loggingIn,
        loggedIn,
        loginFailed
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
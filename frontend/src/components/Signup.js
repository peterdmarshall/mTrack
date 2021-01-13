import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, TextField, CircularProgress, Container, Grid, Box } from '@material-ui/core';
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
    signupButton: {
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
    }
});

function Signup(props) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [passwordVerify, setPasswordVerify] = useState('');
    const [passwordVerifyError, setPasswordVerifyError] = useState(false);
    
    const history = useHistory();
    const classes = useStyles();

    const { dispatch, signingUp, signedUp, signupFailure } = props;

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const handleNameChange = (e) => {
        const { value } = e.target;
        setName(value);
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    }

    const handlePasswordVerifyChange = (e) => {
        const { value } = e.target;
        setPasswordVerify(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset Errors
        setEmailError(false);
        setNameError(false);
        setPasswordError(false);
        setPasswordVerifyError(false);

        if(password !== passwordVerify) {
            setPasswordVerifyError(true);
            return;
        }

        if(email && name && password) {
            dispatch(userActions.signup(email, name, password));
        } 
        
        if (!email) {
            setEmailError(true);
        } 
        if (!password) {
            setPasswordError(true);
            setPasswordVerifyError(true);
        } 
        if (!name) {
            setNameError(true);
        }
    }

    if(signedUp) {
        history.push('/login');
    }

    return (
        <Box className={classes.root}>
        <Container>
            <Grid container justify="center">
            <Paper elevation={0} className={classes.paper}>
                <Grid container justify="center">
                    <Grid container item xs={9} spacing={3} direction="column">
                        <Grid item container justify="center">
                            <h1>Sign Up</h1>
                        </Grid>
                        <Grid item>
                        <form name="form" onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    id="email-field"
                                    label={"Email"}
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
                                    id="name-field"
                                    label={"Name"}
                                    error={nameError}
                                    helperText={nameError ? 'Name is required' : ''}
                                    value={name}
                                    onChange={handleNameChange}
                                    variant="filled"
                                    className={classes.inputField}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password-field"
                                    type="password"
                                    label={"Password"}
                                    error={passwordError}
                                    helperText={passwordError ? 'Password is required' : ''}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    variant="filled"
                                    className={classes.inputField}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password-verify-field"
                                    type="password"
                                    label={"Verify Password"}
                                    error={passwordVerifyError}
                                    helperText={passwordVerifyError ? 'Passwords must match' : ''}
                                    value={passwordVerify}
                                    onChange={handlePasswordVerifyChange}
                                    variant="filled"
                                    className={classes.inputField}
                                />
                            </div>
                            <div>
                                {!signingUp && <Button className={classes.signupButton} type="submit">Sign Up</Button>}
                                { signingUp && <CircularProgress />}
                            </div>
                            <div>
                                { signupFailure &&
                                    <Alert severity="error" >Signup Failed</Alert>
                                }
                            </div>
                        </form>
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
    const { signingUp, signedUp, signupFailure } = state.user;
    return {
        signingUp,
        signedUp,
        signupFailure
    };
}

const connectedSignup = connect(mapStateToProps)(Signup);
export { connectedSignup as Signup };
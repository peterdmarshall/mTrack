import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardCardGrid } from './BoardCardGrid';
import { LogoutButton } from './LogoutButton';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../actions/user.actions';
import { Hidden, FormControlLabel, Divider, List, ListItem, Button, Paper, TextField, CircularProgress, Container, Grid, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    h3: {
        margin: 0,
        padding: 0
    },
    content: {
        width: '80vw',
        height: '70vh',
    },
    sideBar: {
        height: '70vh',
        margin: '1vh',
        background: '#e6e6e6'
    },
    mainContent: {
        height: '70vh',
        margin: '1vh',
        borderRadius: '1vh',
        background: '#e6e6e6'
    },
    header: {
        paddingTop: '1vh',
        paddingBottom: '1vh',
        paddingLeft: '2vh',
        borderRadius: '0.3vh',
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF'
    },
    boardGrid: {
        margin: '1vh'
    }
});

function Home(props) {
    const { dispatch, user, loggedIn } = props;
    const history = useHistory();
    const classes = useStyles();

    return (
        <Box>
        <Container>
            <Grid container position="row">
                <Grid item xs={12}>
                    <Paper className={classes.mainContent}>
                        <div className={classes.header}>
                            <Typography variant="h4">
                                Your Boards
                            </Typography>
                        </div>
                        <div className={classes.boardGrid}>
                            <BoardCardGrid />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user, loggedIn } = authentication;
    const { boards, loadingBoards } = state.board;
    return {
        user,
        boards,
        loadingBoards,
        loggedIn
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };

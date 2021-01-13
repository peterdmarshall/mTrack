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
        background: '#e6e6e6'
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
                <Hidden smDown>
                <Grid item xs={0} md={3}>
                    <Paper className={classes.sideBar}>
                        <List>
                            <ListItem><Typography>Boards</Typography></ListItem>
                            <Divider />
                            <ListItem><Typography>Templates</Typography></ListItem>
                        </List>
                    </Paper>
                </Grid>
                </Hidden>
                <Grid item xs={12} md={9}>
                    <Paper className={classes.mainContent}>
                        <Typography variant="h5">
                            Your Boards
                        </Typography>
                        <BoardCardGrid />
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

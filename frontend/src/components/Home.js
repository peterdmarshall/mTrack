import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { BoardCardGrid } from './BoardCardGrid';
import { LogoutButton } from './LogoutButton';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Divider, List, ListItem, Button, Paper, TextField, CircularProgress, Container, Grid, Box, Typography } from '@material-ui/core';

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
    const { user } = props;
    const history = useHistory();
    const classes = useStyles();

    if(!user) {
        history.push('/login');
    }

    return (
        <Box>
        <Container>
            <Grid container position="row">
                <Grid item xs={3}>
                    <Paper className={classes.sideBar}>
                        <List>
                            <ListItem><Typography>Boards</Typography></ListItem>
                            <Divider />
                            <ListItem><Typography>Templates</Typography></ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
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

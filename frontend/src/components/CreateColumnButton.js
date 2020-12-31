import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Card, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/column.actions';
import { cardActions } from '../actions/card.actions';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    root: {

    },
    cardContent: {
        height: '5vh',
        minHeight: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContentItem: {
        margin: '1%'
    }
});

function CreateColumnButton(props) {

    const { dispatch, user, board } = props;
    const classes = useStyles();

    const content = "New Column";

    const createColumn = () => {
        dispatch(columnActions.create('Test', board.id, user));
    }

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card>
                <CardActionArea onClick={createColumn}>
                    <CardContent className={classes.cardContent}>
                        <AddIcon className={classes.cardContentItem}></AddIcon>
                        <Typography className={classes.cardContentItem}>
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    const { board } = state.board;
    return {
        user,
        board
    };
}

const connectedCreateColumnButton = connect(mapStateToProps)(CreateColumnButton);
export { connectedCreateColumnButton as CreateColumnButton };
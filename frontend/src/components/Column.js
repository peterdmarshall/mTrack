import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Card, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/board.actions';
import { cardActions } from '../actions/card.actions';

const useStyles = makeStyles({
    column: {
        background: '#d9d9d9',
        margin: '2%'
    },
    columnHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
        height: '3vh'
    },
    columnContent: {
        height: '10vh',
        minHeight: '20px'
    }
});

function Column(props) {

    const { dispatch, column, user } = props;
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Card className={classes.column}>
                <CardHeader 
                    title={column.title}
                    titleTypographyProps={{variant:'subtitle1'}}
                    className={classes.columnHeader}
                />
                <CardContent className={classes.columnContent}>
                    <Typography>
                        {column.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedColumn = connect(mapStateToProps)(Column);
export { connectedColumn as Column };
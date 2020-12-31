import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Card, GridListTile, CardHeader, CardContent, CardActionArea, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { columnActions } from '../actions/board.actions';
import { cardActions } from '../actions/card.actions';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    column: {
        background: '#d9d9d9',
        margin: '2vh 0.5vw',
        width: '15vw',
        minWidth: '300px',
    },
    card: {
        background: '#d9d9d9',
        height: '100%'
    },
    columnHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF',
        height: '3vh'
    },
    columnContent: {
        height: '10vh',
        minHeight: '20px',
    },
    cardContent: {
        height: '5vh',
        minHeight: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        margin: '2%',
        borderRadius: '3px'
    },
    cardContentItem: {
        margin: '1%'
    }
});

function Column(props) {

    const { dispatch, column, user } = props;
    const classes = useStyles();

    const content = "Add Card"

    const createCard = (columnId) => {

    }

    return (
        <GridListTile key={column.id} className={classes.column}>
            <Card className={classes.card}>
                <CardHeader 
                    title={column.title}
                    titleTypographyProps={{variant:'subtitle1'}}
                    className={classes.columnHeader}
                />
                <CardActionArea onClick={() => createCard(column.id)}>
                    <CardContent className={classes.cardContent}>
                        <AddIcon className={classes.cardContentItem}></AddIcon>
                        <Typography className={classes.cardContentItem}>
                            {content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </GridListTile>
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
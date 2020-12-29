import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardActionArea, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        background: '#d9d9d9',
        margin: '2%'
    },
    cardHeader: {
        background: 'linear-gradient(70deg, #3642CF, #BF37AD)',
        color: '#FFFFFF'
    },
    cardContent: {
        height: '5vh',
        minHeight: '20px'
    }
});

export default function BoardListItem(props) {

    const { board } = props;
    const history = useHistory();
    const classes = useStyles();

    const loadBoard = (boardId) => {
        history.push('/board', { boardId: boardId })
    }

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardActionArea onClick={() => loadBoard(board.id)}>
                <CardHeader title={board.name} className={classes.cardHeader}></CardHeader>
                <CardContent className={classes.cardContent}>
                    <Typography>
                        {board.description}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
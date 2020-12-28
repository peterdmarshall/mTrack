import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardActionArea, ListItem, Typography } from '@material-ui/core';

export default function BoardListItem(props) {

    const { board } = props;
    const history = useHistory();

    const loadBoard = (boardId) => {
        history.push('/board', { boardId: boardId })
    }

    return (
        <ListItem>
        <Card>
            <CardActionArea onClick={() => loadBoard(board.id)}>
            <CardHeader title={board.name}></CardHeader>
            </CardActionArea>
        </Card>
        </ListItem>
    );
}
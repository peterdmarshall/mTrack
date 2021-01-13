import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, Box, Typography, Paper } from '@material-ui/core';

import { columnActions } from '../actions/column.actions';
import { boardActions } from '../actions/board.actions';
import { cardActions } from '../actions/card.actions';

import { Column } from './Column';
import { CreateColumnButton } from './CreateColumnButton';

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ContactsOutlined } from '@material-ui/icons';
import { userActions } from '../actions/user.actions';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexWrap: 'wrap',
        justifyContent: 'left',
        overflow: 'hidden',
        height: '90vh'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This costs memory but helps keep high FPS.
        transform: 'translateZ(0)',
    },
});


/**
 * Moves a card within a column.
 */
const reorder = (cards, startIndex, endIndex) => {
    console.log('startIndex: ' + startIndex);
    console.log('endIndex: ' + endIndex);
    
    // Add id and update position for cards to cardOrderJson
    cards.forEach(card => {
        console.log('card: ' + card.position);
        if(card.position == startIndex) {
            card.position = endIndex;
        } else {
            if(startIndex > endIndex) {
                // Card moved up column
                // Shift elements between startIndex and endIndex downwards
                if(card.position < startIndex && card.position >= endIndex) {
                    card.position += 1;
                }
            } else if(startIndex < endIndex) {
                // Card moved down column
                // Shift elements between startIndex and endIndex upwards
                if(card.position > startIndex && card.position <= endIndex) {
                    card.position -= 1;
                }
            }
        }
    });

    return cards;
};
  
/**
 * Moves a card from one column to another column.
 */
const move = (sourceCards, destinationCards, droppableSource, droppableDestination) => {
    // Shift all cards below the source index in the source column down by one
    console.log('sourceIndex: ' + droppableSource.index);
    console.log('destIndex: ' + droppableDestination.index);
    
    sourceCards.forEach(card => {
        if(card.position > droppableSource.index) {
            card.position -= 1;
        } else if (card.position === droppableSource.index) {
            console.log('update droppable');
            card.position = droppableDestination.index;
            card.column_id = droppableDestination.droppableId;
        }
    });

    // Shift all cards at and below the target index in the target column down by one
    destinationCards.forEach(card => {
        if(card.position >= droppableDestination.index) {
            card.position += 1;
        }
    });

    return sourceCards.concat(destinationCards);
};

function Board(props) {

    const { dispatch, user, loggedIn, board, cards, columns, updatedColumn, loadingBoard, removedColumn, createdColumn } = props;
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if(board) {
            dispatch(boardActions.get(board.id, user));
        }
    }, []);

    useEffect(() => {
        if(board) {
            dispatch(columnActions.getAll(board.id, user));
        }
    }, [updatedColumn, removedColumn, createdColumn, board]);

    if(loadingBoard) {
        return <p>Loading...</p>
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        console.log('sInd: ' + sInd);
        console.log('dInd: ' + dInd);

        if(sInd === dInd) {
            // Card moved within its current column so re-order the cards
            const reorderedCards = reorder(cards[sInd], source.index, destination.index);
            // Persist the changes
            if(reorderedCards !== []) {
                dispatch(cardActions.updateAll(reorderedCards, board.id, sInd, user));
            }
        } else {
            console.log('move');
            const updatedCards = move(cards[sInd], cards[dInd], source, destination);
            
            if(updatedCards !== []) {
                dispatch(cardActions.updateAll(updatedCards, board.id, user));
            }
        }
    }

    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <GridList cols={5} className={classes.gridList}>
                    { columns && columns.map((column, index) => (
                        <Droppable key={column.id} droppableId={`${column.id}`} className={classes.columnDroppable}>
                            {(provided, snapshot) => (
                                <Column
                                    innerRef={provided.innerRef}
                                    provided={provided} 
                                    column={column}
                                >
                                </Column>
                            )}
                        </Droppable>
                    ))}
                    <CreateColumnButton />
                </GridList>
            </DragDropContext>
        </div>
    );
}


const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user, loggedIn } = authentication;
    const { board, loadingBoard } = state.board;
    const { columns, updatedColumn, removedColumn, createdColumn } = state.column;
    const { cards } = state.card;
    return {
        user,
        board,
        loadingBoard,
        columns,
        updatedColumn,
        removedColumn,
        createdColumn,
        cards,
        loggedIn
    };
}

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };
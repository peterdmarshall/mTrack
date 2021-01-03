import { cardConstants } from '../constants/card.constants';
import { alertActions } from './alert.actions';
import { apiService } from '../services/api.service';

export const cardActions = {
    getAll,
    get,
    create,
    remove,
    update
};

function getAll(boardId, columnId, user) {
    return dispatch => {
        dispatch(request(columnId));

        apiService.getAllCards(boardId, columnId, user)
            .then(
                cards => {
                    dispatch(success(cards, columnId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request() { return { type: cardConstants.GETALL_REQUEST } }
    function success(cards, columnId) { return { type: cardConstants.GETALL_SUCCESS, cards, columnId } }
    function failure(error) { return { type: cardConstants.GETALL_FAILURE, error } }
}

function get(boardId, columnId, cardId, user) {
    return dispatch => {
        dispatch(request(cardId));

        apiService.getCard(boardId, columnId, cardId, user)
            .then(
                card => {
                    dispatch(success(card, columnId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: cardConstants.GET_REQUEST } }
    function success(card, columnId) { return { type: cardConstants.GET_SUCCESS, card, columnId } }
    function failure(error) { return { type: cardConstants.GET_FAILURE, error } }
}


function create(title, description, boardId, columnId, user) {
    return dispatch => {
        dispatch(request(columnId));

        apiService.createCard(title, description, boardId, columnId, user)
            .then(
                card => {
                    dispatch(success(card, columnId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: cardConstants.CREATE_REQUEST } }
    function success(card, columnId) { return { type: cardConstants.CREATE_SUCCESS, card, columnId } }
    function failure(error) { return { type: cardConstants.CREATE_FAILURE, error } }
}

function update(title, description, boardId, columnId, cardId, user, newColumnId = columnId) {
    return dispatch => {
        dispatch(request(cardId));

        apiService.updateCard(title, description, boardId, columnId, cardId, user, newColumnId)
            .then(
                card => {
                    dispatch(success(card, columnId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: cardConstants.UPDATE_REQUEST } }
    function success(card, columnId) { return { type: cardConstants.UPDATE_SUCCESS, card, columnId } }
    function failure(error) { return { type: cardConstants.UPDATE_FAILURE, error } }
}

function remove(boardId, columnId, cardId, user) {
    return dispatch => {
        dispatch(request(cardId));

        apiService.removeCard(boardId, columnId, cardId, user)
            .then(
                card => {
                    dispatch(success(card, columnId));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: cardConstants.REMOVE_REQUEST } }
    function success(card, columnId) { return { type: cardConstants.REMOVE_SUCCESS, card, columnId } }
    function failure(error) { return { type: cardConstants.REMOVE_FAILURE, error } }
}
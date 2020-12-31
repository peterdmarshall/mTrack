import { cardConstants } from '../constants/card.constants';
import { alertActions } from './alert.actions';
import { apiService } from '../services/api.service';

export const cardActions = {
    getAll,
    get,
    create,
    remove
};

function getAll(columnId, user) {
    return dispatch => {
        dispatch(request(columnId));

        apiService.getAllCards(columnId, user)
            .then(
                cards => {
                    dispatch(success(cards));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request() { return { type: cardConstants.GETALL_REQUEST } }
    function success(cards) { return { type: cardConstants.GETALL_SUCCESS, cards } }
    function failure(error) { return { type: cardConstants.GETALL_FAILURE, error } }
}

function get(cardId, user) {
    return dispatch => {
        dispatch(request(cardId));

        apiService.getCard(cardId, user)
            .then(
                card => {
                    dispatch(success(card));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: cardConstants.GET_REQUEST } }
    function success(card) { return { type: cardConstants.GET_SUCCESS, card } }
    function failure(error) { return { type: cardConstants.GET_FAILURE, error } }
}


function create(title, description, columnId, user) {
    return dispatch => {
        dispatch(request(columnId));

        apiService.createCard(title, description, columnId, user)
            .then(
                card => {
                    dispatch(success(card));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: cardConstants.CREATE_REQUEST } }
    function success(card) { return { type: cardConstants.CREATE_SUCCESS, card } }
    function failure(error) { return { type: cardConstants.CREATE_FAILURE, error } }
}

function remove(cardId, user) {
    return dispatch => {
        dispatch(request(cardId));

        apiService.removeCard(cardId, user)
            .then(
                card => {
                    dispatch(success(card));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: cardConstants.REMOVE_REQUEST } }
    function success(card) { return { type: cardConstants.REMOVE_SUCCESS, card } }
    function failure(error) { return { type: cardConstants.REMOVE_FAILURE, error } }
}
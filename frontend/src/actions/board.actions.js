import { boardConstants } from '../constants/board.constants';
import { alertActions } from './alert.actions';
import { apiService } from '../services/api.service';

export const boardActions = {
    getAll,
    get,
    create,
    remove
};

function getAll(user) {
    return dispatch => {
        dispatch(request());

        apiService.getAllBoardsForUser(user)
            .then(
                boards => {
                    dispatch(success(boards));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            )
    };

    function request() { return { type: boardConstants.GETALL_REQUEST } }
    function success(boards) { return { type: boardConstants.GETALL_SUCCESS, boards } }
    function failure(error) { return { type: boardConstants.GETALL_FAILURE, error } }
}

function get(boardId, user) {
    return dispatch => {
        dispatch(request());

        apiService.getUserBoard(boardId, user)
            .then(
                board => {
                    dispatch(success(board));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: boardConstants.GET_REQUEST } }
    function success(board) { return { type: boardConstants.GET_SUCCESS, board } }
    function failure(error) { return { type: boardConstants.GET_FAILURE, error } }
}


function create(name, description, user) {
    return dispatch => {
        dispatch(request());

        apiService.createUserBoard(name, description, user)
            .then(
                board => {
                    dispatch(success(board));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: boardConstants.CREATE_REQUEST } }
    function success(board) { return { type: boardConstants.CREATE_SUCCESS, board } }
    function failure(error) { return { type: boardConstants.CREATE_FAILURE, error } }
}

function remove(boardId, user) {
    return dispatch => {
        dispatch(request(boardId));

        apiService.removeUserBoard(boardId, user)
            .then(
                board => {
                    dispatch(success(board));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: boardConstants.REMOVE_REQUEST } }
    function success(board) { return { type: boardConstants.REMOVE_SUCCESS, board } }
    function failure(error) { return { type: boardConstants.REMOVE_FAILURE, error } }
}
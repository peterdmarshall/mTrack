import { columnConstants } from '../constants/column.constants';
import { alertActions } from './alert.actions';
import { apiService } from '../services/api.service';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const columnActions = {
    getAll,
    create,
    update,
    remove
};


function getAll(boardId, user) {
    return dispatch => {
        dispatch(request());

        apiService.getAllColumns(boardId, user)
            .then(
                columns => {
                    dispatch(success(columns));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: columnConstants.GETALL_REQUEST } }
    function success(columns) { return { type: columnConstants.GETALL_SUCCESS, columns} }
    function failure(error) { return { type: columnConstants.GETALL_FAILURE, error } }
}


function create(title, boardId, user) {
    return dispatch => {
        dispatch(request());

        apiService.createColumn(title, boardId, user)
            .then(
                column => {
                    dispatch(success(column));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: columnConstants.CREATE_REQUEST } }
    function success(column) { return { type: columnConstants.CREATE_SUCCESS, column } }
    function failure(error) { return { type: columnConstants.CREATE_FAILURE, error } }
}

function update(title, boardId, columnId, user) {
    return dispatch => {
        dispatch(request());

        apiService.updateColumn(title, boardId, columnId, user)
            .then(
                column => {
                    dispatch(success(column));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            )
    };

    function request() { return { type: columnConstants.UPDATE_REQUEST } }
    function success(column) { return { type: columnConstants.UPDATE_SUCCESS, column } }
    function failure(error) { return { type: columnConstants.UPDATE_FAILURE, error } }
}


function remove(boardId, columnId, user) {
    return dispatch => {
        dispatch(request());

        apiService.removeColumn(boardId, columnId, user)
            .then(
                column => {
                    dispatch(success(column));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: columnConstants.REMOVE_REQUEST } }
    function success(board) { return { type: columnConstants.REMOVE_SUCCESS, board } }
    function failure(error) { return { type: columnConstants.REMOVE_FAILURE, error } }
}
import { boardConstants } from '../constants/board.constants';
import { alertActions } from './alert.actions';
import { apiService } from '../services/api.service';

export const boardActions = {
    getAll
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
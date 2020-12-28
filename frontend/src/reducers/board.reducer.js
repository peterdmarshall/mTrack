import { boardConstants } from '../constants/board.constants';

export function board(state = {}, action) {
    switch (action.type) {
    case boardConstants.GET_REQUEST:
        return {
            loadingBoard: true,
        };
    case boardConstants.GET_SUCCESS:
        return {
            board: action.board,
        };
    case boardConstants.GET_FAILURE:
        return {};
    case boardConstants.GETALL_REQUEST:
        return {
            loadingBoards: true,
        };
    case boardConstants.GETALL_SUCCESS:
        return {
            boards: action.boards,
        };
    case boardConstants.GETALL_FAILURE:
        return {};
    default:
        return state
    }
}
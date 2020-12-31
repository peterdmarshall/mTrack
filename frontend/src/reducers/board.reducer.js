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
    case boardConstants.CREATE_REQUEST:
        return {
            creatingBoard: true,
        };
    case boardConstants.CREATE_SUCCESS:
        return {
            board: action.board,
        };
    case boardConstants.CREATE_FAILURE:
        return {};
    case boardConstants.REMOVE_REQUEST:
        return {
            removingBoard: true
        };
    case boardConstants.REMOVE_SUCCESS:
        return {
            removedBoard: true,
            board: action.board
        };
    case boardConstants.REMOVE_FAILURE:
        return {};
    default:
        return state
    }
}
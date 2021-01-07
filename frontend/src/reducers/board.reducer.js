import { boardConstants } from '../constants/board.constants';

export function board(state = {}, action) {
    switch (action.type) {
    case boardConstants.GET_REQUEST:
        return {
            loadingBoard: true,
        };
    case boardConstants.GET_SUCCESS:
        return {
            loadingBoard: false,
            board: action.board,
        };
    case boardConstants.GET_FAILURE:
        return {
            loadingBoard: false,
        };
    case boardConstants.GETALL_REQUEST:
        return {
            loadingBoards: true,
        };
    case boardConstants.GETALL_SUCCESS:
        return {
            loadingBoards: false,
            boards: action.boards,
        };
    case boardConstants.GETALL_FAILURE:
        return {
            loadingBoards: false
        };
    case boardConstants.CREATE_REQUEST:
        return {
            creatingBoard: true,
        };
    case boardConstants.CREATE_SUCCESS:
        return {
            creatingBoard: false,
            board: action.board,
        };
    case boardConstants.CREATE_FAILURE:
        return {
            creatingBoard: false,
        };
    case boardConstants.REMOVE_REQUEST:
        return {
            removingBoard: true
        };
    case boardConstants.REMOVE_SUCCESS:
        return {
            removingBoard: false,
            removedBoard: true,
            board: action.board
        };
    case boardConstants.REMOVE_FAILURE:
        return {
            ...state,
            removingBoard: false,
        };
    default:
        return state
    }
}
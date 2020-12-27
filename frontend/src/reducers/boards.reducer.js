import { boardConstants } from '../constants/board.constants';

export function boards(state = {}, action) {
    switch (action.type) {
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
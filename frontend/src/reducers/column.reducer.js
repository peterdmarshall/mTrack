import { columnConstants } from '../constants/column.constants';

export function column(state = {}, action) {
    switch (action.type) {
    case columnConstants.GETALL_REQUEST:
        return {
            loadingColumns: true,
        };
    case columnConstants.GETALL_SUCCESS:
        return {
            columns: action.columns,
        };
    case columnConstants.GETALL_FAILURE:
        return {};
    case columnConstants.CREATE_REQUEST:
        return {
            creatingColumn: true,
        };
    case columnConstants.CREATE_SUCCESS:
        return {
            createdColumn: true,
        };
    case columnConstants.CREATE_FAILURE:
        return {};
    case columnConstants.UPDATE_REQUEST:
        return {
            updatingColumn: true,
        };
    case columnConstants.UPDATE_SUCCESS:
        return {
            updatedColumn: action.column,
        };
    case columnConstants.UPDATE_FAILURE:
        return {};
    case columnConstants.REMOVE_REQUEST:
        return {
            removingColumn: true
        };
    case columnConstants.REMOVE_SUCCESS:
        return {
            removedColumn: true
        };
    case columnConstants.REMOVE_FAILURE:
        return {};
    default:
        return state
    }
}
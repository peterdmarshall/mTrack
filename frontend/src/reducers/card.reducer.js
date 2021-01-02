import { cardConstants } from '../constants/card.constants';

export function card(state = {}, action) {
    switch (action.type) {
    case cardConstants.GET_REQUEST:
        return {
            ...state,
            loadingCard: true,
        };
    case cardConstants.GET_SUCCESS:
        return {
            ...state,
            loadingCard: false,
            card: action.card,
        };
    case cardConstants.GET_FAILURE:
        return {
            ...state,
            loadingCard: false,
        };
    case cardConstants.GETALL_REQUEST:
        return {
            ...state,
            loadingCards: true,
        };
    case cardConstants.GETALL_SUCCESS:
        return {
            ...state,
            loadingCards: false,
            cards: {
                ...state.cards,
                [action.columnId]: action.cards
            }
        };
    case cardConstants.GETALL_FAILURE:
        return {
            ...state,
            loadingCards: false,
        };
    case cardConstants.CREATE_REQUEST:
        return {
            ...state,
            creatingCard: true,
        };
    case cardConstants.CREATE_SUCCESS:
        return {
            ...state,
            creatingCard: false,
            card: action.card,
        };
    case cardConstants.CREATE_FAILURE:
        return {
            ...state,
            creatingCard: false,
        };
    case cardConstants.UPDATE_REQUEST:
        return {
            ...state,
            updatingCard: true
        };
    case cardConstants.UPDATE_SUCCESS:
        return {
            ...state,
            updatingCard: false,
            updatedCard: true,
            card: action.card
        };
    case cardConstants.UPDATE_FAILURE:
        return {
            ...state,
            updatingCard: false,
        };
    case cardConstants.REMOVE_REQUEST:
        return {
            ...state,
            removingCard: true
        };
    case cardConstants.REMOVE_SUCCESS:
        return {
            ...state,
            removingCard: false,
            removedCard: true,
            card: action.card
        };
    case cardConstants.REMOVE_FAILURE:
        return {
            ...state,
            removingCard: false,
        };
    default:
        return state
    }
}
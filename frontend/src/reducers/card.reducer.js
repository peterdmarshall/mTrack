import { cardConstants } from '../constants/card.constants';

export function card(state = {}, action) {
    switch (action.type) {
    case cardConstants.GET_REQUEST:
        return {
            loadingCard: true,
        };
    case cardConstants.GET_SUCCESS:
        return {
            card: action.card,
        };
    case cardConstants.GET_FAILURE:
        return {};
    case cardConstants.GETALL_REQUEST:
        return {
            loadingCards: true,
        };
    case cardConstants.GETALL_SUCCESS:
        return {
            cards: action.cards,
        };
    case cardConstants.GETALL_FAILURE:
        return {};
    case cardConstants.CREATE_REQUEST:
        return {
            creatingCard: true,
        };
    case cardConstants.CREATE_SUCCESS:
        return {
            card: action.card,
        };
    case cardConstants.CREATE_FAILURE:
        return {};
    case cardConstants.REMOVE_REQUEST:
        return {
            removingCard: true
        };
    case cardConstants.REMOVE_SUCCESS:
        return {
            removedCard: true,
            card: action.card
        };
    case cardConstants.REMOVE_FAILURE:
        return {};
    default:
        return state
    }
}
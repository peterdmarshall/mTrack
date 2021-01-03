import { cardConstants } from '../constants/card.constants';

export function card(state = {}, action) {
    switch (action.type) {
    case cardConstants.GET_REQUEST:
        return {
            card: state.card,
            cards: state.cards,
            loadingCard: true,
        };
    case cardConstants.GET_SUCCESS:
        return {
            cards: state.cards,
            loadingCard: false,
            card: action.card,
        };
    case cardConstants.GET_FAILURE:
        return {
            card: state.card,
            cards: state.cards,
            loadingCard: false,
        };
    case cardConstants.GETALL_REQUEST:
        return {
            card: state.card,
            cards: state.cards,
            loadingCards: true,
        };
    case cardConstants.GETALL_SUCCESS:
        return {
            card: state.card,
            loadingCards: false,
            cards: {
                ...state.cards,
                [action.columnId]: action.cards
            }
        };
    case cardConstants.GETALL_FAILURE:
        return {
            card: state.card,
            cards: state.cards,
            loadingCards: false,
        };
    case cardConstants.CREATE_REQUEST:
        return {
            card: state.card,
            cards: state.cards,
            creatingCard: true,
        };
    case cardConstants.CREATE_SUCCESS:
        return {
            cards: state.cards,
            creatingCard: false,
            card: action.card,
        };
    case cardConstants.CREATE_FAILURE:
        return {
            card: state.card,
            cards: state.cards,
            creatingCard: false,
        };
    case cardConstants.UPDATE_REQUEST:
        return {
            card: state.card,
            cards: state.cards,
            updatingCard: true
        };
    case cardConstants.UPDATE_SUCCESS:
        return {
            cards: state.cards,
            updatingCard: false,
            updatedCard: true,
            card: action.card
        };
    case cardConstants.UPDATE_FAILURE:
        return {
            card: state.card,
            cards: state.cards,
            updatingCard: false,
        };
    case cardConstants.REMOVE_REQUEST:
        return {
            card: state.card,
            cards: state.cards,
            removingCard: true
        };
    case cardConstants.REMOVE_SUCCESS:
        return {
            cards: state.cards,
            removingCard: false,
            removedCard: true,
            card: action.card
        };
    case cardConstants.REMOVE_FAILURE:
        return {
            card: state.card,
            cards: state.cards,
            removingCard: false,
        };
    default:
        return state
    }
}
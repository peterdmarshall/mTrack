import { userConstants } from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_CLEAR:
        return {
            user: state.user
        };
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user
        };
    case userConstants.LOGIN_FAILURE:
        return {
            loginFailed: true
        };
    case userConstants.LOGOUT:
        return {};
    default:
        return state
    }
}
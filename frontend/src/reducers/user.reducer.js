import { userConstants } from '../constants/user.constants';

export function user(state = {}, action) {
    switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
        return {
            signingUp: true,
        };
    case userConstants.SIGNUP_SUCCESS:
        return {
            signedUp: true,
        };
    case userConstants.SIGNUP_FAILURE:
        return {
            signupFailure: true,
        };
    case userConstants.LOGIN_CLEAR:
        return {};
    default:
        return state
    }
}
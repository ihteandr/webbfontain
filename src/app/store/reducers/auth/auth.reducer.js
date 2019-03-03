import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../../constants';

import {
    handleLoginSuccess,
    handleLogoutSuccess,
} from './handlers';

const initialState = {
    isLoggedIn: false,
    name: null,
};


export const authReducer = function authReducer(state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return handleLoginSuccess(state, payload);
        case LOGOUT_SUCCESS:
            return handleLogoutSuccess(state);
        default:
            return state;
    }
};

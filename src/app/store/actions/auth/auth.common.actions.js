import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../constants';

export function login(name) {
    return dispatch => dispatch({
        type: LOGIN_SUCCESS,
        payload: name,
    });
}


export function logout() {
    return dispatch => dispatch({
        type: LOGOUT_SUCCESS,
    });
}


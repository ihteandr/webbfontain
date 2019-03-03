export function handleLoginSuccess(state, payload) {
    return {
        ...state,
        isLoggedIn: true,
        name: payload,
    };
}

export function handleLogoutSuccess(state) {
    return {
        ...state,
        isLoggedIn: false,
        name: null,
    };
}

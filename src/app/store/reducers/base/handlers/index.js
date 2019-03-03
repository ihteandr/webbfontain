export function handleFetchWordsProcess(state) {
    return {
        ...state,
        words: [],
        isLoading: true,
    };
}

export function handleFetchWordsSuccess(state, payload) {
    return {
        ...state,
        words: payload[0].replace(/(,|\.)/g, '').split(' ').filter(Boolean),
        isLoading: false,
    };
}

export function handleFetchHistorySuccess(state, payload) {
    return {
        ...state,
        history: payload,
    };
}

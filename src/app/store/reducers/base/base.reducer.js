import {
    handleFetchWordsProcess,
    handleFetchWordsSuccess,
    handleFetchHistorySuccess,
} from './handlers';
import {
    FETCH_WORDS_SUCCESS,
    FETCH_WORDS_PROCESS,
    FETCH_HISTORY_SUCCESS,
} from '../../constants';

const initialState = {
    words: [],
    isLoading: false,
    history: [],
};

export function baseReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_WORDS_PROCESS:
            return handleFetchWordsProcess(state);
        case FETCH_WORDS_SUCCESS:
            return handleFetchWordsSuccess(state, payload);
        case FETCH_HISTORY_SUCCESS:
            return handleFetchHistorySuccess(state, payload);
        default:
            return state;
    }
}

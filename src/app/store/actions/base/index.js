import { apiManager } from '../../../services';
import {
    FETCH_WORDS_SUCCESS,
    FETCH_WORDS_PROCESS,
    FETCH_WORDS_ERROR,
    SAVE_RESULT_PROCESS,
    SAVE_RESULT_SUCCESS,
    SAVE_RESULT_ERROR,
    FETCH_HISTORY_PROCESS,
    FETCH_HISTORY_SUCCESS,
    FETCH_HISTORY_ERROR,
} from '../../constants';
import {
    HISTORY_STORAGE_ID,
} from '../../../constants';
import { asyncAction } from '../../utils/async-action';

export function fetchWords() {
    return dispatch => asyncAction({
        successType: FETCH_WORDS_SUCCESS,
        type: FETCH_WORDS_PROCESS,
        errorType: FETCH_WORDS_ERROR,
        action: () => apiManager.ipsum.doGet('/', {
            params: {
                type: 'meat-and-filler',
                'start-with-lorem': '1',
                paras: '3',
            },
        }),
        dispatch,
    });
}

export function saveResult(data) {
    return dispatch => asyncAction({
        successType: SAVE_RESULT_SUCCESS,
        type: SAVE_RESULT_PROCESS,
        errorType: SAVE_RESULT_ERROR,
        action: async () => {
            const history = await apiManager.storage.doGet(`/${HISTORY_STORAGE_ID}`).catch(() => null);
            history.push(data);
            await apiManager.storage.doPut(`/${HISTORY_STORAGE_ID}`, history);
        },
        dispatch,
    });
}

export function fetchHistory() {
    return dispatch => asyncAction({
        successType: FETCH_HISTORY_SUCCESS,
        type: FETCH_HISTORY_PROCESS,
        errorType: FETCH_HISTORY_ERROR,
        action: () => apiManager.storage.doGet(`/${HISTORY_STORAGE_ID}`),
        dispatch,
    });
}

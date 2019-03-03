import {
    createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import {
    authReducer,
    baseReducer,
} from './reducers';

const getAvailableDevTools = () => {
    if (window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return f => f;
};


const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk
    ),
    getAvailableDevTools()
)(createStore);


export default createStoreWithMiddleware(
    combineReducers({
        auth: authReducer,
        base: baseReducer,
    })
);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as ReduxRouter } from 'react-router-redux';
import Root from './pages/root';
import store from './store';
import history from './utils/history';
import './styles/index.scss';

const rootElement = document.getElementById('main');

window.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <ReduxRouter history={history}>
                <Root />
            </ReduxRouter>
        </Provider>,
        rootElement
    );
});

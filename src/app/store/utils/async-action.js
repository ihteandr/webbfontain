// @flow

import type { DispatchAPI } from 'redux';

type AsyncActionOptions = {
    dispatch: DispatchAPI<*>,
    action: () => Promise<*>,
    type: string,
    payload?: Object,
    successType: string,
    errorType: string,
};

export async function asyncAction(options: AsyncActionOptions): Promise<any> {
    options.dispatch({
        type: options.type,
        payload: options.payload,
    });
    await options.action().then(
        (response) => {
            options.dispatch({
                type: options.successType,
                payload: response,
            });
            return response;
        },
        (error) => {
            options.dispatch({
                payload: error,
                type: options.errorType,
            });
            return error;
        }
    );
}

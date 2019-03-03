import { getApiClass } from './getApiClass';

class ApiManager {
    ipsum: any;

    storage: any;

    constructor() {
        this.ipsum = getApiClass({
            apiUrl: 'https://baconipsum.com/api',
        });
        this.storage = getApiClass({
            apiUrl: 'https://api.myjson.com/bins',
        });
    }
}

export const apiManager = new ApiManager();

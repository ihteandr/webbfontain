import { Connector } from './connector';

export function getApiClass(configs) {
    const connector = new Connector(configs.apiUrl, configs.timeout);
    const errorHandler = configs.errorHandler || function eh(res) { return res.error; };
    const successHandler = configs.successHandler || function sh(res) { return res.data; };
    class Api {
        races = [];

        static setHeaders(headers) {
            connector.setHeaders({
                ...headers,
            });
        }

        getRace(key) {
            return this.races.find(race => race.key === key);
        }

        withPreventRaceCondition(key, requestFn) {
            return new Promise((resolve, reject) => {
                const race = this.getRace(key);
                if (!race) {
                    this.races.push({
                        key,
                        resolve,
                        reject,
                    });
                } else {
                    race.resolve = resolve;
                    race.reject = reject;
                }
                requestFn().then((res) => {
                    this.getRace(key).resolve(res);
                }, (res) => {
                    this.getRace(key).reject(res);
                });
            });
        }

        async wrapRequest(requestFn) {
            const res = await requestFn().catch(errorHandler);
            return successHandler(res);
        }

        async doGet(url, config = {}) {
            const res = await this.wrapRequest(() => connector.get(url, config));
            return res;
        }

        async doPost(url, data = {}, config = {}) {
            const res = await this.wrapRequest(() => connector.post(url, data, config));
            return res;
        }

        async doPut(url, data = {}, config = {}) {
            const res = await this.wrapRequest(() => connector.put(url, data, config));
            return res;
        }

        async doDelete(url, config = {}) {
            const res = await this.wrapRequest(() => connector.delete(url, config));
            return res;
        }

        async doRequest(config = {}) {
            const res = await this.wrapRequest(() => connector.request(config));
            return res;
        }
    }
    return new Api();
}

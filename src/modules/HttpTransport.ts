import config from '@/config';

interface IOptions {
    timeout?: number;
    method?: string;
    headers?: Record<string, any>;
    data?: Record<string, any>;
    [key: string]: any;
}

const METHODS: Record<string, string> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data: Record<string, any>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

type HttpMethod = (url: string, options?: IOptions) => Promise<unknown>;

export default class HttpTransport {
    get: HttpMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout,
        );
    };

    post: HttpMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout,
        );
    };

    put: HttpMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout,
        );
    };

    delete: HttpMethod = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout,
        );
    };

    request = (
        url: string,
        options: IOptions,
        timeout = 5000,
    ): Promise<XMLHttpRequest> => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            const fullUrl = `${config.BASE_URL}${url}`;

            if (isGet && !!data) {
                xhr.open(method, `${fullUrl}${queryStringify(data)}`);
            } else {
                xhr.open(method, fullUrl);
            }
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

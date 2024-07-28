import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getStaticApiInstance = new HttpTransport();

type TResponse = Blob | string;

export default class GetStaticApi extends BaseAPI {
    request(path: string): Promise<TResponse> {
        return getStaticApiInstance
            .get(`/resources${path}`, { responseType: 'blob' })
            .then((xhr) => {
                const response = (xhr as XMLHttpRequest).response;
                if (!response) {
                    throw new Error('Empty response received');
                }

                // if (typeof response === 'string') {
                //     console.log('api returned string');
                // } else {
                //     console.log('api returned ' + typeof response);
                // }
                return response;
            });
    }
}

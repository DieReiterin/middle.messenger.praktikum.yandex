import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getUserInfoApiInstance = new HttpTransport();

type TResponse = string;

export default class GetUserInfoApi extends BaseAPI {
    request(): Promise<TResponse> {
        return getUserInfoApiInstance.get('/auth/user').then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            return rawResponse;
        });
    }
}

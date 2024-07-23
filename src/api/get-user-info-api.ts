import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getUserInfoApiInstance = new HttpTransport();

type TErrorResponse = {
    reason: string;
};

type TCorrectResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

type TResponse = TErrorResponse | TCorrectResponse | string;

export default class GetUserInfoApi extends BaseAPI {
    request(): Promise<TResponse> {
        return getUserInfoApiInstance.get('/auth/user').then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            if (typeof rawResponse === 'string') {
                return rawResponse;
            }
            const response = JSON.parse(rawResponse) as TResponse;
            return response;
        });
    }
}

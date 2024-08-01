import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const loginApiInstance = new HttpTransport();

type TLoginRequest = {
    login: string;
    password: string;
};

type TLoginObjectResponse = {
    user_id?: number;
    reason?: string;
};

type TLoginResponse = string | TLoginObjectResponse;

export default class LoginApi extends BaseAPI {
    request(user: TLoginRequest): Promise<TLoginResponse> {
        return loginApiInstance
            .post('/auth/signin', {
                data: user,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (typeof rawResponse === 'string') {
                    return rawResponse;
                }
                const response = JSON.parse(
                    rawResponse,
                ) as TLoginObjectResponse;
                return response;
            });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}

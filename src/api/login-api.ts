import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const loginApiInstance = new HttpTransport();

type TLoginRequest = {
    login: string;
    password: string;
};

type TUserIdResponse = {
    user_id: number;
};

type TErrorResponse = {
    reason: string;
};

type TLoginResponse = string | TUserIdResponse | TErrorResponse;

export default class LoginApi extends BaseAPI {
    request(user: TLoginRequest): Promise<TLoginResponse> {
        return loginApiInstance
            .post('/auth/signin', {
                data: user,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (rawResponse === 'OK') {
                    return rawResponse;
                } else {
                    return JSON.parse(rawResponse);
                    // const response = JSON.parse(
                    //     rawResponse,
                    // ) as TLoginObjectResponse;
                    // return response;
                }
            });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}

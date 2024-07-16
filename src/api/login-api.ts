import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const authAPIInstance = new HttpTransport();

type TLoginRequest = {
    login: string;
    password: string;
};

type TLoginResponse = {
    user_id: number;
};

export default class LoginAPI extends BaseAPI {
    request(user: TLoginRequest): Promise<TLoginResponse> {
        return authAPIInstance
            .post('/auth/signin', {
                data: user,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((xhr) => {
                const response = JSON.parse(
                    (xhr as XMLHttpRequest).responseText,
                ) as TLoginResponse;
                return response;
            });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}

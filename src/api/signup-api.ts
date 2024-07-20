import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const signupAPIInstance = new HttpTransport();

type TSignupRequest = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
};

type TSignupResponse = {
    user_id?: number;
    reason?: string;
};

export default class SignupAPI extends BaseAPI {
    request(user: TSignupRequest): Promise<TSignupResponse> {
        return signupAPIInstance
            .post('/auth/signup', {
                data: user,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((xhr) => {
                const response = JSON.parse(
                    (xhr as XMLHttpRequest).responseText,
                ) as TSignupResponse;
                return response;
            });
        // .post('/login', user)
        // .then(({ user_id }) => user_id);
    }
}

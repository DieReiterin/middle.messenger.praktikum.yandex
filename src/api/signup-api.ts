import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const signupApiInstance = new HttpTransport();

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

export default class SignupApi extends BaseAPI {
    request(user: TSignupRequest): Promise<TSignupResponse> {
        return signupApiInstance
            .post('/auth/signup', {
                data: user,
            })
            .then((xhr) => {
                const response = JSON.parse(
                    (xhr as XMLHttpRequest).responseText,
                ) as TSignupResponse;
                return response;
            });
    }
}

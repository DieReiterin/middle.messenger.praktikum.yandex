import HttpTransport from '@/modules/HttpTransport';

const signupApiInstance = new HttpTransport();

type TSignupRequest = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
};

type TUserIdResponse = {
    user_id: number;
};

type TErrorResponse = {
    reason: string;
};

type TSignupResponse = string | TUserIdResponse | TErrorResponse;

export default class SignupApi {
    request(user: TSignupRequest): Promise<TSignupResponse> {
        return signupApiInstance
            .post('/auth/signup', {
                data: user,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (rawResponse === 'OK') {
                    return rawResponse;
                } else {
                    return JSON.parse(rawResponse);
                }
            });
    }
}

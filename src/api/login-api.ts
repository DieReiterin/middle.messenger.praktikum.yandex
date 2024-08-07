import HttpTransport from '@/modules/HttpTransport';

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

export default class LoginApi {
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
                }
            });
    }
}

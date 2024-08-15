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
    id: number;
};

type TErrorResponse = {
    reason: string;
};

type TSignupResponse = TUserIdResponse | TErrorResponse;

export default class SignupApi {
    request(user: TSignupRequest): Promise<TSignupResponse> {
        return signupApiInstance
            .post('/auth/signup', {
                data: user,
            })
            .then((xhr) => {
                try {
                    const rawResponse = (xhr as XMLHttpRequest).responseText;
                    const parsedResponse = JSON.parse(rawResponse);
                    return parsedResponse;
                } catch (error) {
                    return 'parse error';
                }
            });
    }
}

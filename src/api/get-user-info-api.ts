import HttpTransport from '@/modules/HttpTransport';

const getUserInfoApiInstance = new HttpTransport();

type TResponse = string;

export default class GetUserInfoApi {
    request(): Promise<TResponse> {
        return getUserInfoApiInstance.get('/auth/user').then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            return rawResponse;
        });
    }
}

import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const profileAPIInstance = new HttpTransport();

type TChangeProfileRequest = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
};

type TChangeProfileObjectResponse = {
    reason?: string;
    [key: string]: any;
};

type TChangeProfileResponse = string | TChangeProfileObjectResponse;

export default class ProfileAPI extends BaseAPI {
    request(dataParam: TChangeProfileRequest): Promise<TChangeProfileResponse> {
        return profileAPIInstance
            .put('/user/profile', {
                data: dataParam,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                if (typeof rawResponse === 'string') {
                    return rawResponse;
                }
                const response = JSON.parse(
                    rawResponse,
                ) as TChangeProfileObjectResponse;
                return response;
            });
    }
}

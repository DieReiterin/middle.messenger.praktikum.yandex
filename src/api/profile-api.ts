import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const profileApiInstance = new HttpTransport();

type TChangeProfileRequest = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
};

type TCorrectResponse = {
    [key: string]: any;
};

type TErrorResponse = {
    reason: string;
};

type TChangeProfileResponse = string | TCorrectResponse | TErrorResponse;

export default class ProfileApi extends BaseAPI {
    request(dataParam: TChangeProfileRequest): Promise<TChangeProfileResponse> {
        return profileApiInstance
            .put('/user/profile', {
                data: dataParam,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                return JSON.parse(rawResponse);
            });
    }
}

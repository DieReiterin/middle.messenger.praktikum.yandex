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

// type TChangeProfileObjectResponse = {
//     reason?: string;
//     [key: string]: any;
// };

// type TChangeProfileResponse = string | TChangeProfileObjectResponse;
type TChangeProfileResponse = string;

export default class ProfileAPI extends BaseAPI {
    request(dataParam: TChangeProfileRequest): Promise<TChangeProfileResponse> {
        return profileAPIInstance
            .put('/user/profile', {
                data: dataParam,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                // if (typeof rawResponse === 'string') {
                //     console.log('api returned string response');
                return rawResponse;
                // }
                // console.log('api returned parsed object response');
                // const response = JSON.parse(
                //     rawResponse,
                // ) as TChangeProfileObjectResponse;
                // return response;
            });
    }
}

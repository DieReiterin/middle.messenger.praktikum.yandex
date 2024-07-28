import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const editAvatarApiInstance = new HttpTransport();

type TChangeProfileResponse = string;

export default class EditAvatarApi extends BaseAPI {
    request(dataParam: FormData): Promise<TChangeProfileResponse> {
        return editAvatarApiInstance
            .put('/user/profile/avatar', {
                data: dataParam,
                // headers: { 'Content-Type': 'application/json' },
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

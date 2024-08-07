import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const editAvatarApiInstance = new HttpTransport();

type TChangeProfileResponse = string;

export default class EditAvatarApi extends BaseAPI {
    request(dataParam: FormData): Promise<TChangeProfileResponse> {
        return editAvatarApiInstance
            .put('/user/profile/avatar', {
                data: dataParam,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                return rawResponse;
            });
    }
}

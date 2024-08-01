import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const editPasswordApiInstance = new HttpTransport();

type TEditPasswordRequest = {
    oldPassword: string;
    newPassword: string;
};
type TEditPasswordResponse = string;

export default class EditPasswordApi extends BaseAPI {
    request(dataParam: TEditPasswordRequest): Promise<TEditPasswordResponse> {
        return editPasswordApiInstance
            .put('/user/password', {
                data: dataParam,
            })
            .then((xhr) => {
                return (xhr as XMLHttpRequest).responseText;
            });
    }
}

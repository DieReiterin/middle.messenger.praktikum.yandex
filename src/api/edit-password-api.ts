import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const editPasswordAPIInstance = new HttpTransport();

type TEditPasswordRequest = {
    oldPassword: string;
    newPassword: string;
};
type TEditPasswordResponse = string;

export default class EditPasswordAPI extends BaseAPI {
    request(dataParam: TEditPasswordRequest): Promise<TEditPasswordResponse> {
        return editPasswordAPIInstance
            .put('/user/password', {
                data: dataParam,
                headers: { 'Content-Type': 'application/json' },
            })
            .then((xhr) => {
                return (xhr as XMLHttpRequest).responseText;
            });
    }
}

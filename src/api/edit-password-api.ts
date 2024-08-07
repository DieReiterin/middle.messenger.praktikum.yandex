import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const editPasswordApiInstance = new HttpTransport();

type TEditPasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

type TErrorResponse = {
    reason: string;
};
type TEditPasswordResponse = string | TErrorResponse;

export default class EditPasswordApi extends BaseAPI {
    request(dataParam: TEditPasswordRequest): Promise<TEditPasswordResponse> {
        return editPasswordApiInstance
            .put('/user/password', {
                data: dataParam,
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

import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const logoutAPIInstance = new HttpTransport();

type TLogoutResponse = string;

export default class LogoutAPI extends BaseAPI {
    request(): Promise<TLogoutResponse> {
        return logoutAPIInstance.post('/auth/logout').then((xhr) => {
            return (xhr as XMLHttpRequest).responseText;
        });
    }
}

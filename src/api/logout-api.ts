import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const logoutApiInstance = new HttpTransport();

type TLogoutResponse = string;

export default class LogoutApi extends BaseAPI {
    request(): Promise<TLogoutResponse> {
        return logoutApiInstance.post('/auth/logout').then((xhr) => {
            return (xhr as XMLHttpRequest).responseText;
        });
    }
}

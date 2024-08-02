import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getChatUsersApiInstance = new HttpTransport();

// type TChatRequest = {
//     login: string;
//     password: string;
// };

type TResponse = {
    [key: string]: any;
};

export default class GetChatUsersApi extends BaseAPI {
    request(chatId: string): Promise<TResponse> {
        return getChatUsersApiInstance
            .get(`/chats/${chatId}/users`)
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                const parsedResponse = JSON.parse(rawResponse);
                return parsedResponse;
            });
    }
}

import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getChatTokenApiInstance = new HttpTransport();

type TCorrectResponse = {
    token: string;
};
type TResponse = TCorrectResponse;

export default class GetChatTokenApi extends BaseAPI {
    request(chatId: string): Promise<TResponse> {
        return getChatTokenApiInstance
            .post(`/chats/token/${chatId}`)
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                const parsedResponse = JSON.parse(rawResponse);
                return parsedResponse;
            });
    }
}

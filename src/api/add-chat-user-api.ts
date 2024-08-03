import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const addChatUserApiInstance = new HttpTransport();

type TRequest = {
    userIdParam: string;
    chatIdParam: string;
};
type TResponse = string;

export default class AddChatUserApi extends BaseAPI {
    request(dataParam: TRequest): Promise<TResponse> {
        const preparedData = {
            users: [dataParam.userIdParam],
            chatId: dataParam.chatIdParam,
        };

        return addChatUserApiInstance
            .put(`/chats/users`, { data: preparedData })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                // const parsedResponse = JSON.parse(rawResponse);
                return rawResponse;
            });
    }
}

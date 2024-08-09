import HttpTransport from '@/modules/HttpTransport';

const getChatUsersApiInstance = new HttpTransport();

type TResponse = {
    [key: string]: any;
};

export default class GetChatUsersApi {
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

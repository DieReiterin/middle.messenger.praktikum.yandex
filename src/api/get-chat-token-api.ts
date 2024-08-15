import HttpTransport from '@/modules/HttpTransport';

const getChatTokenApiInstance = new HttpTransport();

type TCorrectResponse = {
    token: string;
};
type TResponse = TCorrectResponse;

export default class GetChatTokenApi {
    request(chatId: string): Promise<TResponse> {
        return getChatTokenApiInstance
            .post(`/chats/token/${chatId}`)
            .then((xhr) => {
                try {
                    const rawResponse = (xhr as XMLHttpRequest).responseText;
                    const parsedResponse = JSON.parse(rawResponse);
                    return parsedResponse;
                } catch (error) {
                    return 'parse error';
                }
            });
    }
}

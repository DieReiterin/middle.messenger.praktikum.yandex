import HttpTransport from '@/modules/HttpTransport';

const deleteChatUserApiInstance = new HttpTransport();

type TRequest = {
    userIdParam: string;
    chatIdParam: string;
};
type TResponse = string;

export default class DeleteChatUserApi {
    request(dataParam: TRequest): Promise<TResponse> {
        const preparedData = {
            users: [dataParam.userIdParam],
            chatId: dataParam.chatIdParam,
        };

        return deleteChatUserApiInstance
            .delete('/chats/users', { data: preparedData })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                return rawResponse;
            });
    }
}

import HttpTransport from '@/modules/HttpTransport';

const addChatUserApiInstance = new HttpTransport();

type TRequest = {
    userIdParam: string;
    chatIdParam: string;
};
type TResponse = string;

export default class AddChatUserApi {
    request(dataParam: TRequest): Promise<TResponse> {
        const preparedData = {
            users: [dataParam.userIdParam],
            chatId: dataParam.chatIdParam,
        };

        return addChatUserApiInstance
            .put(`/chats/users`, { data: preparedData })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                return rawResponse;
            });
    }
}

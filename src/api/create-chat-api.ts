import HttpTransport from '@/modules/HttpTransport';

const createChatApiInstance = new HttpTransport();

type TCreateChatRequest = {
    title: string;
};

type TCorrectResponse = {
    id: string;
};
type TErrorResponse = {
    reason: string;
};
type TCreateChatResponse = TCorrectResponse | TErrorResponse;

export default class CreateChatApi {
    request(requestData: TCreateChatRequest): Promise<TCreateChatResponse> {
        return createChatApiInstance
            .post('/chats', {
                data: requestData,
            })
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

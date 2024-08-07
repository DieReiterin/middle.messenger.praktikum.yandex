import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const createChatApiInstance = new HttpTransport();

type TCreateChatRequest = {
    title: string;
};

export default class CreateChatApi extends BaseAPI {
    request(requestData: TCreateChatRequest): Promise<string> {
        return createChatApiInstance
            .post('/chats', {
                data: requestData,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                const parsedResponse = JSON.parse(rawResponse);
                return parsedResponse;
            });
    }
}

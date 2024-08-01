import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const createChatApiInstance = new HttpTransport();

// type TErrorResponse = {
//     reason: string;
// };

type TCreateChatRequest = {
    title: string;
};

// type TChatResponse = TErrorResponse | IChat[] | string;

export default class CreateChatApi extends BaseAPI {
    // create() {
    //     return chatAPIInstance.post('api/v1/chats', { title: 'string' });
    // }
    request(requestData: TCreateChatRequest): Promise<string> {
        // console.log('dataTitle', dataTitle);

        return createChatApiInstance
            .post('/chats', {
                data: requestData,
            })
            .then((xhr) => {
                const rawResponse = (xhr as XMLHttpRequest).responseText;
                const parsedResponse = JSON.parse(rawResponse);
                return parsedResponse;
                // const response = JSON.parse(rawResponse) as TChatResponse;
                // return response;
            });
    }
}

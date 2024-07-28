import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const chatApiInstance = new HttpTransport();

// type TChatRequest = {
//     login: string;
//     password: string;
// };

type TErrorResponse = {
    reason: string;
};

interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}

type TChatResponse = TErrorResponse | IChat[] | string;

export default class GetChatsApi extends BaseAPI {
    // create() {
    //     return chatAPIInstance.post('api/v1/chats', { title: 'string' });
    // }

    request(): Promise<TChatResponse> {
        return chatApiInstance.get('/chats').then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            // if (typeof rawResponse === 'string') {
            return rawResponse;
            // }
            // const response = JSON.parse(rawResponse) as TChatResponse;
            // return response;
        });
    }
}

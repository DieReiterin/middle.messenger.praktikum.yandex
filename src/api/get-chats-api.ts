import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const getChatsApiInstance = new HttpTransport();

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

type TChatResponse = IChat[] | string;

export default class GetChatsApi extends BaseAPI {
    request(): Promise<TChatResponse> {
        return getChatsApiInstance.get('/chats').then((xhr) => {
            const rawResponse = (xhr as XMLHttpRequest).responseText;
            const parsedResponse = JSON.parse(rawResponse);
            return parsedResponse;
        });
    }
}

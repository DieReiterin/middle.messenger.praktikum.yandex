import HttpTransport from '@/modules/HttpTransport';

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

export default class GetChatsApi {
    request(): Promise<TChatResponse> {
        return getChatsApiInstance.get('/chats').then((xhr) => {
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

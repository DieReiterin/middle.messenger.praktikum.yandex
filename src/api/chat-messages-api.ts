import HttpTransport from '@/modules/HttpTransport';

const chatMessagesApiInstance = new HttpTransport();

export default class ChatMessagesApi {
    request(id: string): Promise<unknown> {
        return chatMessagesApiInstance.get(`api/v1/messages/${id}`);
    }
}

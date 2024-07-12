import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const chatMessagesAPIInstance = new HttpTransport();

export default class ChatMessagesAPI extends BaseAPI {
    request(id: string): Promise<unknown> {
        return chatMessagesAPIInstance.get(`api/v1/messages/${id}`);
    }
}

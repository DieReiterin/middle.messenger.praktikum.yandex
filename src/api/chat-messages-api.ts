import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const chatMessagesApiInstance = new HttpTransport();

export default class ChatMessagesApi extends BaseAPI {
    request(id: string): Promise<unknown> {
        return chatMessagesApiInstance.get(`api/v1/messages/${id}`);
    }
}

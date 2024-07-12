import HttpTransport from '@/modules/HttpTransport';
import { BaseAPI } from '@/modules/http/base-api';

const chatAPIInstance = new HttpTransport();

export default class ChatAPI extends BaseAPI {
    create() {
        return chatAPIInstance.post('api/v1/chats', { title: 'string' });
    }

    request() {
        return chatAPIInstance.get('/api/v1/chats/full');
    }
}

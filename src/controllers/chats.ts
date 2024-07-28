import GetChatsApi from '@/api/get-chats-api';

const getChatsApi = new GetChatsApi();

export default class ChatController {
    public async getChats() {
        try {
            // console.log('Loading...');
            // console.log('ChatController called');

            const response = await getChatsApi.request();

            if (typeof response === 'object' && 'reason' in response) {
                console.log('Server error reason: ' + response.reason);
                return;
            }
            console.log('response: ', response);

            // console.log('Loading complete');
        } catch (error) {
            console.log('Chat Controller failed:', error);
        }
    }
}

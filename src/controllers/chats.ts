import GetChatsApi from '@/api/get-chats-api';
import CreateChatApi from '@/api/create-chat-api';

const getChatsApi = new GetChatsApi();
const createChatApi = new CreateChatApi();

type TCreateChatRequest = {
    title: string;
};

export default class ChatController {
    public async getChats() {
        try {
            // console.log('Loading...');
            // console.log('ChatController called');

            const response = await getChatsApi.request();

            // const parsedResponse = JSON.parse(response);

            return response;
            // console.log('response: ', response);
        } catch (error) {
            console.log('Chat Controller failed:', error);
        }
    }

    public async createChat(data: TCreateChatRequest) {
        try {
            // console.log('Loading...');
            // console.log('ChatController called');

            const response = await createChatApi.request(data);

            // const parsedResponse = JSON.parse(response);

            return response;
            // console.log('response: ', response);
        } catch (error) {
            console.log('Chat Controller failed:', error);
        }
    }
}

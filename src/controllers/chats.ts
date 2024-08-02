import GetChatsApi from '@/api/get-chats-api';
import CreateChatApi from '@/api/create-chat-api';
import GetChatUsersApi from '@/api/get-chat-users-api';
import AddChatUserApi from '@/api/add-chat-user-api';

const getChatsApi = new GetChatsApi();
const createChatApi = new CreateChatApi();
const getChatUsersApi = new GetChatUsersApi();
const addChatUserApi = new AddChatUserApi();

type TCreateChatRequest = {
    title: string;
};
type TAddChatUserRequest = {
    userIdParam: number;
    chatIdParam: number;
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
            throw error;
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
            throw error;
        }
    }

    public async getChatUsers(chatId: string) {
        try {
            // console.log('getChatUsers Controller called');
            const response = await getChatUsersApi.request(chatId);
            return response;
            // console.log('response: ', response);
        } catch (error) {
            throw error;
        }
    }

    public async addChatUser(dataParam: TAddChatUserRequest) {
        try {
            // console.log('addChatUser Controller called');
            const response = await addChatUserApi.request(dataParam);
            return response;
            // console.log('response: ', response);
        } catch (error) {
            throw error;
        }
    }
}

import GetChatsApi from '@/api/get-chats-api';
import CreateChatApi from '@/api/create-chat-api';
import GetChatUsersApi from '@/api/get-chat-users-api';
import AddChatUserApi from '@/api/add-chat-user-api';
import GetChatTokenApi from '@/api/get-chat-token-api';

const getChatsApi = new GetChatsApi();
const createChatApi = new CreateChatApi();
const getChatUsersApi = new GetChatUsersApi();
const addChatUserApi = new AddChatUserApi();
const getChatTokenApi = new GetChatTokenApi();

type TCreateChatRequest = {
    title: string;
};
type TAddChatUserRequest = {
    userIdParam: string;
    chatIdParam: string;
};

export default class ChatController {
    public async getChats() {
        try {
            const response = await getChatsApi.request();
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async createChat(data: TCreateChatRequest) {
        try {
            const response = await createChatApi.request(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async getChatUsers(chatId: string) {
        try {
            const response = await getChatUsersApi.request(chatId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async addChatUser(dataParam: TAddChatUserRequest) {
        try {
            const response = await addChatUserApi.request(dataParam);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async getChatToken(chatId: string) {
        try {
            const response = await getChatTokenApi.request(chatId);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

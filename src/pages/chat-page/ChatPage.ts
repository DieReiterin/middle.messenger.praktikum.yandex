import Block, { IProps } from '@/tools/Block';
import {
    ChatList,
    ChatStub,
    PageTitle,
    ChatDialog,
    ChatMessage,
} from '@/components/index';
import './chat-page.scss';
import connect from '@/tools/connect';
import UserLoginController from '@/controllers/user-login';
import ChatController from '@/controllers/chats';

const userLoginController = new UserLoginController();
const chatController = new ChatController();

class ChatPage extends Block {
    private chatMessages: ChatMessage[] = [];
    private currentDialogElem: ChatDialog = new ChatDialog({
        className: 'chat-page__chat-dialog',
        chatName: 'display_name',
        onSendMessage: (val: string) => this.sendMessage(val),
        messages: new PageTitle({
            className: 'chat-page__alert_type-reel',
            text: 'alertText',
        }),
    });
    private data = {
        currentChatId: '',
        currentChatToken: '',
        myUserId: '',
    };
    private socket: WebSocket | null = null;
    private pingInterval: ReturnType<typeof setInterval> | null = null;
    constructor(props: IProps = {}) {
        super({
            ...props,
            list: new ChatList({
                className: 'chat-page__chat-list',
                onClickChat: (chatId: number) => {
                    this.chatMessages = [];
                    this.data.currentChatToken = '';
                    this.socket = null;
                    this.data.currentChatId = String(chatId);
                    this.requestGetChatUsers();
                },
            }),
        });
        this.getUserInfo();
        this.setChatDialogAlert('Выберите чат чтобы отправить сообщение');
    }
    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return ` - ${hours}:${minutes}`;
    }
    scrollToBottom() {
        const chatReel = document.getElementById('chatReel');
        if (chatReel) {
            setTimeout(() => {
                chatReel.scrollTop = chatReel.scrollHeight;
            }, 0);
        }
    }
    setChatDialogAlert(alertText: string) {
        this.setProps({
            dialog: new PageTitle({
                className: 'chat-page__alert_type-dialog',
                text: alertText,
            }),
        });
    }

    async getUserInfo() {
        try {
            await userLoginController.getInfo();
        } catch (error) {
            console.error('getUserInfo failed:', error);
        }
    }
    async requestGetChatUsers() {
        try {
            this.setChatDialogAlert('Загрузка пользователей...');

            const response = await chatController.getChatUsers(
                this.data.currentChatId,
            );

            if (response && (response as Array<any>).length < 2) {
                this.setProps({
                    dialog: new ChatStub({
                        className: 'chat-page__stub_no-users',
                        onClick: (newUserId: string) => {
                            this.requestAddChatUser(newUserId);
                        },
                    }),
                });
            } else if (response) {
                type TUserMeta = {
                    avatar: string | null;
                    display_name: string;
                    first_name: string;
                    id: string;
                    login: string;
                    role: string;
                    second_name: string;
                };
                this.data.myUserId = this.props.user.id;

                const filteredUsersArr = response.filter(
                    (user: TUserMeta) => user.id !== this.data.myUserId,
                );
                const dialogMeta = filteredUsersArr[0];

                this.currentDialogElem.setProps({
                    chatName: dialogMeta.display_name,
                    messages: [
                        new PageTitle({
                            className: 'chat-page__alert_type-reel',
                            text: 'Получение токена чата...',
                        }),
                    ],
                });
                this.setProps({
                    dialog: this.currentDialogElem,
                });

                this.requestGetChatToken();
            }
        } catch (error) {
            this.setChatDialogAlert('Ошибка загрузки пользователей');
        }
    }
    async requestAddChatUser(newUserId: string) {
        try {
            this.setChatDialogAlert('Добавление пользователя...');
            const data = {
                userIdParam: newUserId,
                chatIdParam: this.data.currentChatId,
            };

            const response = await chatController.addChatUser(data);
            if (response !== 'OK') {
                throw new Error();
            }
            this.chatMessages = [];
            this.requestGetChatUsers();
        } catch (error) {
            this.setChatDialogAlert('Ошибка добавления пользователя');
        }
    }
    async requestGetChatToken() {
        try {
            const response = await chatController.getChatToken(
                this.data.currentChatId,
            );

            if (!response.token) {
                throw new Error();
            } else {
                this.data.currentChatToken = response.token;

                this.currentDialogElem.setProps({
                    messages: [
                        new PageTitle({
                            className: 'chat-page__alert_type-reel',
                            text: 'Создание сокета...',
                        }),
                    ],
                });
                this.setProps({
                    dialog: this.currentDialogElem,
                });

                this.setSocket();
            }
        } catch (error) {
            this.currentDialogElem.setProps({
                messages: [
                    new PageTitle({
                        className: 'chat-page__alert_type-reel',
                        text: 'Ошибка загрузки токена чата',
                    }),
                ],
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });
        }
    }

    setSocket() {
        const { myUserId, currentChatId, currentChatToken } = this.data;

        if (!myUserId || !currentChatId || !currentChatToken) {
            this.setChatDialogAlert(
                'Ошибка создания сокета - неправильные данные',
            );
            return;
        }

        this.socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${myUserId}/${currentChatId}/${currentChatToken}`,
        );

        this.socket.addEventListener('open', () => {
            this.currentDialogElem.setProps({
                messages: [
                    new PageTitle({
                        className: 'chat-page__alert_type-reel',
                        text: 'Загрузка сообщений...',
                    }),
                ],
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });

            this.startPing();
            this.load20Messages();
        });
        this.socket.addEventListener('close', () => {
            this.setSocket();
        });
        this.socket.addEventListener('message', (event) => {
            this.handleSocketMessage(event.data);
        });
        this.socket.addEventListener('error', () => {
            this.stopPing();
        });
    }
    startPing() {
        this.stopPing();
        this.pingInterval = setInterval(() => {
            if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
                return;
            }
            this.socket.send(
                JSON.stringify({
                    type: 'ping',
                }),
            );
        }, 30000);
    }
    stopPing() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }
    handleSocketMessage(eventData: string) {
        if (eventData === 'WS token is not valid') {
            this.currentDialogElem.setProps({
                messages: [
                    new PageTitle({
                        className: 'chat-page__alert_type-reel',
                        text: 'Имеющийся токен невалиден',
                    }),
                ],
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });
            return;
        }
        const parsedData = JSON.parse(eventData);

        if (Array.isArray(parsedData)) {
            if (parsedData.length === 0 && this.chatMessages.length === 0) {
                this.chatMessages = [];
                this.renderMessages();
            } else {
                this.handleMessagesArray(parsedData);
            }
        } else if (parsedData.type === 'message') {
            this.handleMessage(parsedData);
        }
    }
    handleMessage(msg: Record<string, any>) {
        const messageWrapper = [msg];
        this.saveIncomingMessages(messageWrapper, 'single');
        this.renderMessages();
    }
    handleMessagesArray(arr: Array<any>) {
        if (arr.length > 0) {
            this.saveIncomingMessages(arr);
            this.load20Messages(this.chatMessages.length);
        } else {
            this.renderMessages();
        }
    }
    load20Messages(from: number = 0) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    content: String(from),
                    type: 'get old',
                }),
            );
        }
    }
    saveIncomingMessages(arr: Array<any>, type: string = 'array') {
        interface IMessage {
            id: string;
            user_id: number;
            chat_id: number;
            type: string;
            time: number;
            content: string;
            is_read: boolean;
            file: null;
        }
        const incomingMessages = (arr as IMessage[]).map(
            (message) =>
                new ChatMessage({
                    className:
                        message.user_id === parseInt(this.data.myUserId)
                            ? 'chat-message_my'
                            : 'chat-message_partner',
                    content: message.content,
                }),
        );
        if (type === 'single') {
            this.chatMessages.push(incomingMessages[0]);
        } else {
            for (const incomingMsg of incomingMessages) {
                this.chatMessages.unshift(incomingMsg);
            }

            this.currentDialogElem.setProps({
                messages: [
                    new PageTitle({
                        className: 'chat-page__alert_type-reel',
                        text: `Загружено сообщений: ${this.chatMessages.length}`,
                    }),
                ],
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });
        }
    }
    renderMessages() {
        if (this.chatMessages.length === 0) {
            this.currentDialogElem.setProps({
                messages: [
                    new PageTitle({
                        className: 'chat-page__alert_type-reel',
                        text: 'История сообщений пуста',
                    }),
                ],
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });
        } else {
            this.currentDialogElem.setProps({
                messages: this.chatMessages,
            });
            this.setProps({
                dialog: this.currentDialogElem,
            });
        }
    }
    sendMessage(text: string) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            return;
        }
        this.socket.send(
            JSON.stringify({
                content: text,
                type: 'message',
            }),
        );
    }

    componentDidUpdate(): boolean {
        this.scrollToBottom();
        return true;
    }

    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    {{{dialog}}}
                </div>
                `;
    }
}

export default connect(ChatPage);

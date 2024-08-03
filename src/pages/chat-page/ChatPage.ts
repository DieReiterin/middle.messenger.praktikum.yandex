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
    // private chatMessages: ChatMessage[] = [
    //     new ChatMessage({
    //         className: 'chat-message_partner',
    //         content:
    //             'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    //     }),
    //     new ChatMessage({
    //         className: 'chat-message_partner chat-message_pictured',
    //         content:
    //             // '<img src="/images/camera.jpg" alt="camera" class="chat-message__picture">',
    //             '<img src="/images/bg-dialog.jpg" alt="camera" class="chat-message__picture">',
    //     }),
    //     new ChatMessage({
    //         className: 'chat-message_my',
    //         content: 'Круто!',
    //     }),
    // ];
    private chatMessages: ChatMessage[] = [];
    // chatMessagesCount: number = 0;
    private currentDialogElem: ChatDialog = new ChatDialog({
        className: 'chat-page__chat-dialog',
        messages: new PageTitle({
            className: 'chat-page__alert_type-reel',
            text: 'alertText',
        }),
        chatName: 'display_name',
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
                    this.data.currentChatId = String(chatId);
                    this.requestGetChatUsers();
                },
            }),
            // dialog: new PageTitle({
            //     className: 'chat-page__alert_type-dialog',
            //     text: 'История сообщений пуста',
            // }),
        });
        this.getUserInfo();
        this.setChatDialogAlert('Выберите чат чтобы отправить сообщение');
    }

    async getUserInfo() {
        console.log('getUserInfo method called');
        try {
            await userLoginController.getInfo();
            // console.log(this.props);

            // this.updateStoreAndRerender();
        } catch (error) {
            console.error('getUserInfo failed:', error);
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
    setChatReelAlert(alertText: string) {
        this.currentDialogElem.setProps({
            messages: new PageTitle({
                className: 'chat-page__alert_type-reel',
                text: alertText,
            }),
        });
        this.setProps({
            dialog: this.currentDialogElem,
        });
    }

    async requestGetChatUsers() {
        console.log('requestGetChatUsers method called');

        try {
            this.setChatDialogAlert('Загрузка пользователей...');

            const response = await chatController.getChatUsers(
                this.data.currentChatId,
            );
            console.log('getChatUsers response', response);

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
                // this.setProps({
                //     dialog: this.currentDialogElem,
                // });
                this.currentDialogElem.setProps({
                    chatName: dialogMeta.display_name,
                });
                // this.setProps({
                //     dialog: new ChatDialog({
                //         className: 'chat-page__chat-dialog',
                //         messages: [],
                //         chatName: dialogMeta.display_name,
                //     }),
                // });
                this.setChatReelAlert('Получение токена чата...');
                this.requestGetChatToken();
            }
        } catch (error) {
            // this.setChatDialogAlert('Ошибка загрузки пользователей');
        }
    }

    async requestAddChatUser(newUserId: string) {
        console.log('requestAddChatUser method called');

        try {
            this.setChatDialogAlert('Добавление пользователя...');
            const data = {
                userIdParam: newUserId,
                chatIdParam: this.data.currentChatId,
            };

            const response = await chatController.addChatUser(data);
            console.log('response', response);
            if (response !== 'OK') {
                throw new Error();
            }

            this.requestGetChatUsers();
        } catch (error) {
            this.setChatDialogAlert('Ошибка добавления пользователя');
        }
    }

    async requestGetChatToken() {
        console.log('requestGetChatToken method called');
        try {
            const response = await chatController.getChatToken(
                this.data.currentChatId,
            );
            console.log('requestGetChatToken response', response);

            if (!response.token) {
                throw new Error();
            } else {
                this.data.currentChatToken = response.token;
                this.setChatReelAlert('Создание сокета...');
                this.setSocket();
            }
        } catch (error) {
            this.setChatReelAlert('Ошибка загрузки токена чата');
        }
    }

    setSocket() {
        console.log('setSocket method called');
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
            console.log('Соединение установлено');

            // socket.send(
            //     JSON.stringify({
            //         content: 'Моё первое сообщение миру!',
            //         type: 'message',
            //     }),
            // );
            this.startPing();
            this.setChatReelAlert('Загрузка сообщений...');
            this.load20Messages();
        });
        this.socket.addEventListener('close', (event: CloseEvent) => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            this.stopPing();
        });
        this.socket.addEventListener('message', (event) => {
            const parsedData = JSON.parse(event.data);
            if (Array.isArray(parsedData)) {
                console.log('Получены данные - arr');
                if (parsedData.length > 0) {
                    console.log('saving ' + parsedData.length + ' messages');

                    this.saveIncomingMessages(parsedData);
                    this.load20Messages(this.chatMessages.length);
                } else {
                    console.log(
                        'rendering ' + this.chatMessages.length + ' messages',
                    );
                    this.renderMessages();
                }
            } else if (parsedData.type === 'pong') {
                console.log('pong');
            } else {
                console.log('Получены данные', event.data);
            }
        });
        this.socket.addEventListener('error', (event) => {
            console.log('Ошибка', event);
            this.stopPing();
        });
    }
    scrollToBottom() {
        const chatReel = document.getElementById('chatReel');
        if (chatReel) {
            setTimeout(() => {
                chatReel.scrollTop = chatReel.scrollHeight;
            }, 0);
        }
    }
    startPing() {
        this.stopPing();
        this.pingInterval = setInterval(() => {
            if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
                console.log('startPing if expression failed');
                return;
            }
            this.socket.send(
                JSON.stringify({
                    type: 'ping',
                }),
            );
            console.log('ping');
        }, 50000);
    }
    stopPing() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }
    load20Messages(from: number = 0) {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.log('startPing if expression failed');
            return;
        }
        this.socket.send(
            JSON.stringify({
                content: String(from),
                type: 'get old',
            }),
        );
    }
    saveIncomingMessages(arr: Array<any>) {
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
        for (let incomingMsg of incomingMessages) {
            this.chatMessages.push(incomingMsg);
        }
        this.setChatReelAlert(
            'Загружено сообщений: ' + this.chatMessages.length,
        );
    }
    renderMessages() {
        this.currentDialogElem.setProps({
            messages: this.chatMessages,
        });
        this.setProps({
            dialog: this.currentDialogElem,
        });
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

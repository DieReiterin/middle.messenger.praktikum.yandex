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
    constructor(props: IProps = {}) {
        super({
            ...props,
            list: new ChatList({
                className: 'chat-page__chat-list',
                onClickChat: (chatId: number) => {
                    this.requestGetChatUsers(chatId);
                    // this.setProps({
                    //     dialog: new ChatDialog({
                    //         className: 'chat-page__chat-dialog',
                    //     }),
                    // });
                },
            }),
            // dialog: new PageTitle({
            //     className: 'chat-page__stub_small',
            //     text: 'История сообщений пуста',
            // }),
        });
        this.getUserInfo();
        // this.initContent();
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
    // setDialogMeta(type: string = 'syncContentToProps') {
    //     if (type === 'syncContentToProps') {
    //         this.setProps({
    //             dialog: new ChatDialog({
    //                 className: 'chat-page__chat-dialog',
    //                 messages: this.chatMessages,
    //             }),
    //         });
    //     }
    // }
    setChatDialogAlert(alertText: string) {
        this.setProps({
            dialog: new PageTitle({
                className: 'chat-page__stub_small',
                text: alertText,
            }),
        });
    }

    async requestGetChatUsers(chatId: number) {
        console.log('requestGetChatUsers method called');

        try {
            this.setChatDialogAlert('Загрузка пользователей...');

            const response = await chatController.getChatUsers(String(chatId));
            console.log('getChatUsers response', response);

            if (response && (response as Array<any>).length < 2) {
                this.setProps({
                    dialog: new ChatStub({
                        className: 'chat-page__stub_no-users',
                        onClick: (userId: number) => {
                            this.requestAddChatUser(userId, chatId);
                        },
                    }),
                });
            } else if (response) {
                type TUserMeta = {
                    avatar: string | null;
                    display_name: string;
                    first_name: string;
                    id: number;
                    login: string;
                    role: string;
                    second_name: string;
                };
                const myId = this.props.user.id;

                const filteredUsersArr = response.filter(
                    (user: TUserMeta) => user.id !== myId,
                );
                const dialogMeta = filteredUsersArr[0];

                this.setProps({
                    dialog: new ChatDialog({
                        className: 'chat-page__chat-dialog',
                        messages: [],
                        chatName: dialogMeta.display_name,
                    }),
                });
                // this.requestGetChatMessages(chatId);
            }
        } catch (error) {
            // console.log('requestGetChatUsers failed: ', error);
            this.setChatDialogAlert('Ошибка загрузки пользователей');
        }
    }

    async requestAddChatUser(userId: number, chatId: number) {
        console.log('requestAddChatUser method called');

        try {
            this.setChatDialogAlert('Добавление пользователя...');
            const data = {
                userIdParam: userId,
                chatIdParam: chatId,
            };

            const response = await chatController.addChatUser(data);
            console.log('response', response);
            if (response !== 'OK') {
                throw new Error();
            }

            this.requestGetChatUsers(chatId);
        } catch (error) {
            // console.log('requestAddChatUser failed: ', error);
            this.setChatDialogAlert('Ошибка добавления пользователя');
        }
    }

    // async requestGetChatMessages(chatId: number) {
    // requestGetChatMessages(chatId: number) {
    //     console.log('requestGetChatMessages method called');
    //     this.setChatDialogAlert('Загрузка сообщений...');

    //     // try {

    //     //     const response = await chatController.getChatUsers(String(chatId));

    //     //     if (response && (response as Array<any>).length === 0) {
    //     //         this.setProps({
    //     //             dialog: new ChatStub({
    //     //                 className: 'chat-page__stub_no-users',
    //     //             }),
    //     //         });
    //     //     } else if (response) {
    //     //         this.setProps({
    //     //             dialog: new PageTitle({
    //     //                 className: 'chat-page__stub_small',
    //     //                 text: 'Загрузка сообщений...',
    //     //             }),
    //     //         });
    //     //     }
    //     // } catch (error) {
    //     //     // console.log('requestGetChatUsers failed: ', error);
    //     //     this.setChatDialogAlert('Ошибка загрузки сообщений');
    //     // }
    // }

    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    {{{dialog}}}
                </div>
                `;
    }
}

export default connect(ChatPage);

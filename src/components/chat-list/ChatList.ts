import Block, { IProps } from '@/tools/Block';
import {
    ChatItem,
    Link,
    InputField,
    Button,
    Subtitle,
} from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';
import ChatController from '@/controllers/chats';

const chatController = new ChatController();

type TLastMessage = null | {
    user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
    };
    time: string;
    content: string;
};
export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: TLastMessage;
}

export default class ChatList extends Block {
    private usernameElem: Subtitle = new Subtitle({
        className: 'chat-list__username-text',
        text: 'Поиск',
    });
    private chatItems: ChatItem[] = [
        new ChatItem({
            className: 'chat-item_empty-item',
            message: 'Загрузка...',
        }),
    ];
    private data = {
        newChatTitle: '',
        status: 'loading',
    };
    constructor(props: IProps = {}) {
        super({
            ...props,
        });

        this.initControls();
        this.initContent();
        this.requestGetChats();
        this.setProps({
            username: this.usernameElem,
        });
    }

    initControls(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                profileLink: new Link({
                    className: 'chat-list__link',
                    text: 'Профиль',
                    onClick: () => window.router.go('/settings'),
                }),
                createChatInput: new InputField({
                    className: 'chat-list__input input-field_hidden',
                }),
                createChatBtn: new Button({
                    className: 'chat-list__btn',
                    text: 'Создать чат',
                    onClick: () => this.initControls('toggleAddChat'),
                }),
            });
        } else if (type === 'toggleAddChat') {
            this.setProps({
                createChatInput: new InputField({
                    className: 'chat-list__input',
                    placeholder: 'Введите название чата',
                    name: 'new_chat',
                    id: 'new_chat',
                    onInput: (val: string) => {
                        this.data.newChatTitle = val;
                    },
                }),
                createChatBtn: new Button({
                    className: 'chat-list__btn',
                    text: 'Создать чат',
                    onClick: () => this.requestCreateChat(),
                }),
            });
        }
    }

    initContent(type: string = 'syncContentToProps', item?: ChatItem) {
        if (type === 'syncContentToProps') {
            this.setProps({
                content: this.chatItems,
            });
        } else if (type === 'clearList' && item) {
            const newContent = [item];
            this.chatItems = newContent;
            this.data.status = 'clearList';
            this.initContent();
        }
    }

    clearList(alertText: string = 'Нет чатов') {
        const emptyItem = new ChatItem({
            className: 'chat-item_empty-item',
            message: alertText,
        });
        this.initContent('clearList', emptyItem);
    }

    clickChat(chatData: IChat) {
        if (this.chatItems.length === 0) return;

        for (const chat of this.chatItems) {
            if (chat.getChatId() === chatData.id) {
                chat.setProps({
                    className: 'chat-list__chat-item chat-item_selected',
                });
            } else {
                chat.setProps({
                    className: 'chat-list__chat-item',
                });
            }
        }
        if (this.props.onClickChat) {
            this.props.onClickChat(chatData);
        }
    }

    async requestGetChats() {
        try {
            const response = await chatController.getChats();

            if (response && (response as Array<any>).length === 0) {
                this.clearList();
            } else if (response) {
                const newContent = (response as IChat[]).map(
                    (chat) =>
                        new ChatItem({
                            className: 'chat-list__chat-item',
                            chatId: chat.id,
                            avatar: favicon,
                            name: chat.title,
                            message: chat.last_message
                                ? 'есть сообщения'
                                : 'нет сообщений',
                            onClick: () => {
                                const chatData: IChat = {
                                    id: chat.id,
                                    title: chat.title,
                                    avatar: chat.avatar,
                                    unread_count: chat.unread_count,
                                    created_by: chat.created_by,
                                    last_message: chat.last_message,
                                };
                                this.clickChat(chatData);
                            },
                        }),
                );
                this.chatItems = newContent;
                this.initContent();
            }
        } catch (error) {
            this.clearList('Ошибка загрузки чатов');
        }
    }

    async requestCreateChat() {
        if (this.data.newChatTitle === '') return;
        try {
            const request = {
                title: this.data.newChatTitle,
            };
            const response = await chatController.createChat(request);
            if ('reason' in response) {
                throw new Error();
            } else {
                this.data.newChatTitle = '';
                this.initControls();
                this.requestGetChats();
            }
        } catch (error) {
            this.clearList('Не получилось добавить чат');
        }
    }

    render() {
        return `<aside class="chat-list {{ className }}">
                    <div class="chat-list__top">
                        <div class="chat-list__profile">
                            {{{profileLink}}}
                        </div>
                        <div class="search chat-list__username">
                            {{{ username }}}
                        </div>
                    </div>
                    <div class="chat-list__center">            
                        {{{content}}}
                    </div>
                    <div class="chat-list__bottom">            
                        {{{createChatInput}}}
                        {{{createChatBtn}}}
                    </div>
                </aside>`;
    }
}

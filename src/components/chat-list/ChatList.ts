import Block, { IProps } from '@/tools/Block';
import { ChatItem, Link, InputField, Button } from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';
import ChatController from '@/controllers/chats';

const chatController = new ChatController();

export default class ChatList extends Block {
    private chatItems: ChatItem[] = [
        // new ChatItem({
        //     className: '',
        //     avatar: favicon,
        //     name: 'Егор',
        //     message: 'Изображение',
        //     unread: '2',
        //     onClick: () => {
        //         this.clickChat();
        //     },
        // }),
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
        // else if (type === 'addChatItem' && item) {
        //     let newContent = null;
        //     if (this.data.status === 'clearList') {
        //         newContent = [item];
        //         this.data.status = 'chatsLoaded';
        //     } else {
        //         newContent = [...this.chatItems, item];
        //     }
        // this.chatItems = newContent;
        // this.initContent();
        // }
    }

    clearList(alertText: string = 'Нет чатов') {
        const emptyItem = new ChatItem({
            className: 'chat-item_empty-item',
            message: alertText,
        });
        this.initContent('clearList', emptyItem);
    }

    // addChat(item: { id: string }) {
    //     const newChat = new ChatItem({
    //         className: 'chat-page__chat-list',
    //         avatar: favicon,
    //         name: this.data.newChatTitle,
    //         message: 'Изображение',
    //         unread: '2',
    //         onClick: () => {
    //             this.clickChat();
    //         },
    //         id: item.id,
    //     });
    //     this.initControls();
    //     this.initContent('addChatItem', newChat);
    //     this.data.newChatTitle = '';
    // }

    clickChat() {
        if (this.props.onClickChat) {
            this.props.onClickChat();
        }
    }

    async requestGetChats() {
        console.log('requestGetChats method called');

        try {
            // await chatController.getChats();
            const response = await chatController.getChats();

            if (response && (response as Array<any>).length === 0) {
                this.clearList();
            } else if (response) {
                console.log('response', response);

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
                interface IChat {
                    id: number;
                    title: string;
                    avatar: string;
                    unread_count: number;
                    created_by: number;
                    last_message: TLastMessage;
                }

                const newContent = (response as IChat[]).map(
                    (chat) =>
                        new ChatItem({
                            className: 'chat-page__chat-list',
                            // avatar: chat.avatar || favicon,
                            avatar: favicon,
                            name: chat.title,
                            // message: chat.last_message?.content || '',
                            message: '',
                            onClick: () => {
                                this.clickChat();
                            },
                            // unread: String(chat.unread_count),
                        }),
                );
                this.chatItems = newContent;
                this.initContent();
            }
        } catch (error) {
            console.log('requestGetChats failed: ', error);
            this.clearList('Ошибка загрузки чатов');
        }
    }

    async requestCreateChat() {
        if (this.data.newChatTitle === '') return;
        console.log('requestCreateChat method called');
        try {
            const request = {
                title: this.data.newChatTitle,
            };
            const response = await chatController.createChat(request);
            console.log('response', response);
            this.requestGetChats();
        } catch (error) {
            console.log('requestCreateChat failed:', error);
        }
    }

    // componentDidUpdate(): boolean {
    //     this.requestGetChats();
    //     return true;
    // }

    render() {
        return `<aside class="chat-list {{ className }}">
                    <div class="chat-list__top">
                        <div class="chat-list__profile">
                            {{{profileLink}}}
                        </div>
                        <div class="search chat-list__search">
                            <p class="chat-list__search-text">
                                Поиск
                            </p>
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

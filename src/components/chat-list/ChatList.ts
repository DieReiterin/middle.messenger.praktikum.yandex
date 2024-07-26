import Block, { IProps } from '@/tools/Block';
import { ChatItem, Link, InputField, Button } from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';
import ChatController from '@/controllers/chats';

const chatController = new ChatController();

export default class ChatList extends Block {
    private contentElems: ChatItem[] = [
        new ChatItem({
            className: 'chat-page__chat-list',
            avatar: favicon,
            name: 'Изображение',
            message: 'Изображение',
            unread: '2',
            onClick: () => {
                this.clickChat();
            },
        }),
        new ChatItem({
            className: 'chat-page__chat-list',
            avatar: favicon,
            name: 'Егор',
            message: 'Изображение',
            unread: '2',
            onClick: () => {
                this.clickChat();
            },
        }),
    ];
    private data = {
        newChatTitle: '',
    };

    constructor(props: IProps = {}) {
        super({
            ...props,
        });

        this.initControls();
        this.initContent();
        this.fetchChats();
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
                    onClick: () => this.addChat(),
                }),
            });
        }
    }

    initContent(type: string = 'syncContentElemToProps', newItem?: ChatItem) {
        if (type === 'syncContentElemToProps') {
            this.setProps({
                content: this.contentElems,
            });
        } else if (type === 'addChatItem' && newItem) {
            const newContent = [...this.contentElems, newItem];
            this.contentElems = newContent;
            this.initContent();
        }
    }

    addChat() {
        if (this.data.newChatTitle === '') return;

        this.initControls();

        const newChat = new ChatItem({
            className: 'chat-page__chat-list',
            avatar: favicon,
            name: this.data.newChatTitle,
            message: 'Изображение',
            unread: '2',
            onClick: () => {
                this.clickChat();
            },
        });
        this.initContent('addChatItem', newChat);
        this.data.newChatTitle = '';
    }

    clickChat() {
        if (this.props.onClickChat) {
            this.props.onClickChat();
        }
    }

    async fetchChats() {
        console.log('fetchChats method called');

        try {
            await chatController.getChats();
            // const response = await chatController.getChats();

            // this.setProps({
            //     content: response.map(chat => new ChatItem({
            //         className: 'chat-page__chat-list',
            //         avatar: chat.avatar || favicon,
            //         name: chat.title,
            //         message: chat.last_message?.content || '',
            //         unread: String(chat.unread_count),
            //     }))
            // });
        } catch (error) {
            console.log('Failed to fetch chats:', error);
        }
    }

    // componentDidUpdate(): boolean {
    //     this.fetchChats();
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

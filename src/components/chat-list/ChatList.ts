import Block, { IProps } from '@/tools/Block';
import { ChatItem, Link, InputField, Button } from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';
import ChatController from '@/controllers/chats';

const chatController = new ChatController();

export default class ChatList extends Block {
    private contentElems: ChatItem[] = [
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
    };
    private status = 'loading';

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

    initContent(type: string = 'syncContentElemToProps', item?: ChatItem) {
        if (type === 'syncContentElemToProps') {
            this.setProps({
                content: this.contentElems,
            });
        } else if (type === 'clearList' && item) {
            const newContent = [item];
            this.contentElems = newContent;
            this.status = 'clearList';
            this.initContent();
        }
        // else if (type === 'addChatItem' && item) {
        //     let newContent = null;
        //     if (this.status === 'clearList') {
        //         newContent = [item];
        //         this.status = 'chatsLoaded';
        //     } else {
        //         newContent = [...this.contentElems, item];
        //     }
        // this.contentElems = newContent;
        // this.initContent();
        // }
    }

    clearList() {
        const emptyItem = new ChatItem({
            className: 'chat-item_empty-item',
            message: 'Нет чатов',
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
                // const newContent = response.map(chat => new ChatItem({
                //     className: 'chat-page__chat-list',
                //     avatar: chat.avatar || favicon,
                //     name: chat.title,
                //     message: chat.last_message?.content || '',
                //     unread: String(chat.unread_count),
                // }))
                // this.contentElems = newContent;
                // this.initContent();
            }
        } catch (error) {
            console.log('Failed to fetch chats:', error);
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

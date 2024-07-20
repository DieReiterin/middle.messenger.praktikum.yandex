import Block, { IProps } from '@/tools/Block';
import { ChatItem, Link } from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';
import ChatController from '@/controllers/chats';

const chatController = new ChatController();

export default class ChatList extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            link: new Link({
                className: 'chat-list__link',
                text: 'Профиль',
                onClick: () => window.router.go('/settings'),
            }),
            content: [
                new ChatItem({
                    className: 'chat-page__chat-list',
                    avatar: favicon,
                    name: 'Егор',
                    message: 'Изображение',
                    unread: '2',
                }),
                new ChatItem({
                    className: 'chat-page__chat-list',
                    avatar: favicon,
                    name: 'Егор',
                    message: 'Изображение',
                    unread: '2',
                }),
                new ChatItem({
                    className: 'chat-page__chat-list',
                    avatar: favicon,
                    name: 'Егор',
                    message: 'Изображение',
                    unread: '2',
                }),
                new ChatItem({
                    className: 'chat-page__chat-list',
                    avatar: favicon,
                    name: 'Егор',
                    message: 'Изображение',
                    unread: '2',
                }),
            ],
        });

        this.fetchChats();
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

    componentDidUpdate(): boolean {
        this.fetchChats();
        return true;
    }

    render() {
        return `<aside class="chat-list {{ className }}">
                    <div class="chat-list__top">
                        <div class="chat-list__profile">
                            {{{link}}}
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
                </aside>`;
    }
}

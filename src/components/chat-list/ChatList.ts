import Block, { IProps } from '@/tools/Block';
import { ChatItem } from '@/components/index';
import './chat-list.scss';
import favicon from '/icons/favicon.png';

export default class ChatList extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            content: new ChatItem({
                className: 'chat-page__chat-list',
                avatar: favicon,
                name: 'Егор',
                message: 'Изображение',
                unread: '2',
            }),
        });
    }
    render() {
        return `<aside class="chat-list {{ className }}">
                    <div class="chat-list__top">
                        <div class="chat-list__profile">
                            <p class="chat-list__link">
                                Профиль
                            </p>
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

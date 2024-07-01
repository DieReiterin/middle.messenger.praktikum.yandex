import Block from "../../tools/Block.ts";
import { ChatItem } from "../../components/index.ts";
import "./chat-list.scss";
import favicon from "/icons/favicon.png";

export default class ChatList extends Block {
    constructor(props?) {
        super({
            ...props,
            content:
                // [
                new ChatItem({
                    className: "chat-page__chat-list",
                    avatar: favicon,
                    name: "Егор",
                    message: "Изображение",
                    unread: "2",
                }),
            // new ChatItem({
            //     className: "chat-page__chat-list",
            //     name: "Алена",
            //     message:
            //         "Друзья, у меня для вас особенный выпуск новостей!",
            //     unread: "1",
            // }),
            // ],
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

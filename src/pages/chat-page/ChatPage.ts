import Block from "../../tools/Block.ts";
import { ChatList } from "../../components/index.ts";
import "./chat-page.scss";

export default class ChatPage extends Block {
    constructor(props?) {
        super({
            ...props,
            list: new ChatList({
                className: "chat-page__chat-list",
            }),
        });
    }
    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    <div class="chat-page__main">
                        <p class="heading chat-page__heading">
                            Выберите чат чтобы отправить сообщение
                        </p>
                    </div>
                </div>
                `;
    }
}

import Block from "../../tools/Block.ts";
import { ChatList, ChatDialog } from "../../components/index.ts";
import "./chat-page.scss";

export default class ChatPage extends Block {
    constructor(props?) {
        super({
            ...props,
            list: new ChatList({
                className: "chat-page__chat-list",
            }),
            dialog: new ChatDialog({
                className: "chat-page__chat-dialog",
            }),
        });
    }
    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    <div class="chat-page__main">
                        {{{dialog}}}
                    </div>
                </div>
                `;
    }
}

import Block from "../../tools/Block.ts";
import { ChatList, ChatDialog, Subtitle } from "../../components/index.ts";
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
                // events: {
                //     click: () => {
                //         this.setDialog();
                //     },
                // },
            }),
        });
    }
    // defaultList = new ChatList({
    //     className: "chat-page__chat-list",
    // });
    // defaultDialog = new Subtitle({
    //     className: "chat-page__heading",
    //     text: "Выберите чат чтобы отправить сообщение",
    // });
    // setDialog() {
    //     this.setProps({ list: this.defaultList, dialog: this.defaultDialog });
    // }
    // componentDidMount() {
    //     this.setDialog();
    // }
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

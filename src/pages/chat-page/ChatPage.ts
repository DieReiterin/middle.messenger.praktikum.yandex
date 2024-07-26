import Block, { IProps } from '@/tools/Block';
import { ChatList, PageTitle, ChatDialog } from '@/components/index';
import './chat-page.scss';

export default class ChatPage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            list: new ChatList({
                className: 'chat-page__chat-list',
                onClickChat: () => {
                    this.setProps({
                        dialog: new ChatDialog({
                            className: 'chat-page__chat-dialog',
                        }),
                    });
                },
            }),

            dialog: new PageTitle({
                className: 'chat-page__stub',
                text: 'Выберите чат чтобы отправить сообщение',
            }),
        });
    }
    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    {{{dialog}}}
                </div>
                `;
    }
}

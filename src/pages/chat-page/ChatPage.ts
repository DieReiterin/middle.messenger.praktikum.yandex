import Block, { IProps } from '@/tools/Block';
import {
    ChatList,
    ChatStub,
    PageTitle,
    ChatDialog,
    ChatMessage,
} from '@/components/index';
import './chat-page.scss';

export default class ChatPage extends Block {
    private chatMessages: ChatMessage[] = [
        new ChatMessage({
            className: 'chat-message_partner',
            content:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        }),
        new ChatMessage({
            className: 'chat-message_partner chat-message_pictured',
            content:
                // '<img src="/images/camera.jpg" alt="camera" class="chat-message__picture">',
                '<img src="/images/bg-dialog.jpg" alt="camera" class="chat-message__picture">',
        }),
        new ChatMessage({
            className: 'chat-message_my',
            content: 'Круто!',
        }),
    ];
    constructor(props: IProps = {}) {
        super({
            ...props,
            list: new ChatList({
                className: 'chat-page__chat-list',
                // onClickChat: () => {
                //     this.setProps({
                //         dialog: new ChatDialog({
                //             className: 'chat-page__chat-dialog',
                //         }),
                //     });
                // },
            }),
            dialog: new ChatDialog({
                className: 'chat-page__chat-dialog',
                messages: '',
            }),
            // dialog: new PageTitle({
            //     className: 'chat-page__stub_chat-not-selected',
            //     text: 'Выберите чат чтобы отправить сообщение',
            // }),
            // dialog: new ChatStub({
            //     className: 'chat-page__stub_no-users-in-chat',
            // }),
        });
        this.initContent();
    }

    initContent(type: string = 'syncContentToProps') {
        if (type === 'syncContentToProps') {
            this.setProps({
                dialog: new ChatDialog({
                    className: 'chat-page__chat-dialog',
                    messages: this.chatMessages,
                }),
            });
        }
    }

    override render() {
        return `<div class="chat-page">
                    {{{list}}}
                    {{{dialog}}}
                </div>
                `;
    }
}

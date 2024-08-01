import Block, { IProps } from '@/tools/Block';
import './chat-dialog.scss';
import { IconButton, Textarea, ChatMessage } from '@/components/index';
import validate from '@/tools/validate';

export default class ChatDialog extends Block {
    // private contentElems: ChatMessage[] = [
    //     new ChatMessage({
    //         className: 'chat-message_partner',
    //         content:
    //             'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    //     }),
    //     new ChatMessage({
    //         className: 'chat-message_partner chat-message_pictured',
    //         content:
    //             // '<img src="/images/camera.jpg" alt="camera" class="chat-message__picture">',
    //             '<img src="/images/bg-dialog.jpg" alt="camera" class="chat-message__picture">',
    //     }),
    //     new ChatMessage({
    //         className: 'chat-message_my',
    //         content: 'Круто!',
    //     }),
    // ];
    constructor(props: IProps = {}) {
        super({
            ...props,
            sendBtn: new IconButton({
                className: 'chat-dialog__send',
                src: '/icons/arrow.svg',
                alt: 'Отправить',
                onClick: () => this.submitForm(),
            }),
            textField: new Textarea({
                className: 'chat-dialog__text-field',
                name: 'message',
                id: 'message',
                placeholder: 'Сообщение...',
                text: '',
                onInput: (val: string) => {
                    this.data.message = val;
                },
            }),
        });
        // this.initContent();
    }
    private data = {
        message: '',
    };

    // initContent(type: string = 'syncContentToProps') {
    //     if (type === 'syncContentToProps') {
    //         this.setProps({
    //             content: this.contentElems,
    //         });
    //     }
    // }
    submitForm() {
        if (this.validateField()) {
            console.log(this.data);
            console.log('Message sent');
        }
    }
    validateField() {
        const validationResult = validate('message', this.data.message);
        if (validationResult && validationResult !== 'ok') {
            this.setProps({
                sendBtn: new IconButton({
                    className: 'chat-dialog__send',
                    src: '/icons/arrow.svg',
                    alt: 'Отправить',
                    onClick: () => this.submitForm(),
                }),
                textField: new Textarea({
                    className: 'chat-dialog__text-field',
                    name: 'message',
                    id: 'message',
                    placeholder: validationResult,
                    text: '',
                    onInput: (val: string) => {
                        this.data.message = val;
                    },
                }),
            });
            return false;
        } else if (validationResult && validationResult === 'ok') {
            this.setProps({
                sendBtn: new IconButton({
                    className: 'chat-dialog__send',
                    src: '/icons/arrow.svg',
                    alt: 'Отправить',
                    onClick: () => this.submitForm(),
                }),
                textField: new Textarea({
                    className: 'chat-dialog__text-field',
                    name: 'message',
                    id: 'message',
                    placeholder: 'Сообщение...',
                    text: this.data.message,
                    onInput: (val: string) => {
                        this.data.message = val;
                    },
                }),
            });
            return true;
        }
        return true;
    }

    scrollToBottom() {
        const chatReel = document.getElementById('chatReel');
        if (chatReel) {
            setTimeout(() => {
                chatReel.scrollTop = chatReel.scrollHeight;
            }, 0);
        }
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate(): boolean {
        this.scrollToBottom();
        return true;
    }

    render() {
        return `<div class="chat-dialog {{ className }}">
                    <div class="chat-dialog__header">
                        <div class="chat-dialog__header-left">
                            <img class="chat-dialog__user-avatar" alt="Аватар друга" src="/icons/favicon.png">
                            <div class="chat-dialog__user-name">Вадим</div>
                        </div>
                        <div class="chat-dialog__header-right">
                            <img src="/icons/options.svg" alt="options" class="chat-dialog__settings">
                        </div>
                    </div>
                    <div class="chat-dialog__reel" id="chatReel"> 
                            {{{messages}}}
                    </div>
                    <form class="chat-dialog__footer">  
                        <img src="/icons/paper-clip.svg" alt="paper-clip" class="chat-dialog__attach">
                        {{{textField}}}
                        {{{sendBtn}}}
                    </form>
                </div>`;
    }
}

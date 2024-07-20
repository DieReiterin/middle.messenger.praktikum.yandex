import Block, { IProps } from '@/tools/Block';
import './chat-dialog.scss';
import { IconButton, Textarea } from '@/components/index';
import validate from '@/tools/validate';

export default class ChatDialog extends Block {
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
    }
    data = {
        message: '',
    };
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
                    <div class="chat-dialog__reel"> 
                            <div class="chat-dialog__msg chat-dialog__msg_partner">
                                Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                            </div>
                            <div class="chat-dialog__msg chat-dialog__msg_partner chat-dialog__msg_pictured">
                                <img src="/images/camera.jpg" alt="camera" class="chat-dialog__msg-pic">
                            </div>
                            <div class="chat-dialog__msg chat-dialog__msg_my">
                                Круто!
                            </div> 
                            <div class="chat-dialog__msg chat-dialog__msg_partner">
                                Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                                Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                            </div>
                            <div class="chat-dialog__msg chat-dialog__msg_partner chat-dialog__msg_pictured">
                                <img src="/images/camera.jpg" alt="camera" class="chat-dialog__msg-pic">
                            </div>
                            <div class="chat-dialog__msg chat-dialog__msg_my">
                                Круто!
                            </div> 
                    </div>
                    <form class="chat-dialog__footer">  
                        <img src="/icons/paper-clip.svg" alt="paper-clip" class="chat-dialog__attach">
                        {{{textField}}}
                        {{{sendBtn}}}
                    </form>
                </div>`;
    }
}

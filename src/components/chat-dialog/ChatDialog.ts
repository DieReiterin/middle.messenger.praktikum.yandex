import Block, { IProps } from '@/tools/Block';
import './chat-dialog.scss';
import { IconButton, Textarea } from '@/components/index';
import validate from '@/tools/validate';

export default class ChatDialog extends Block {
    private textFieldElem: Textarea = new Textarea({
        className: 'chat-dialog__text-field',
        name: 'message',
        id: 'message',
        placeholder: 'Сообщение...',
        text: '',
        onInput: (val: string) => {
            this.data.message = val;
        },
    });
    private data = {
        message: '',
    };
    constructor(props: IProps = {}) {
        super({
            ...props,
            sendBtn: new IconButton({
                className: 'chat-dialog__send',
                src: '/icons/arrow.svg',
                alt: 'Отправить',
                onClick: () => this.clickSendBtn(),
            }),
            textField: null,
        });
        this.setProps({
            textField: this.textFieldElem,
        });
    }

    clickSendBtn() {
        if (!this.data.message) {
            return;
        }
        if (validate('message', this.data.message) !== 'ok') {
            return;
        }
        if (this.props.onSendMessage) {
            this.props.onSendMessage(this.data.message);
        }

        this.data.message = '';
        this.textFieldElem.setProps({
            text: '',
        });
        this.setProps({
            textField: this.textFieldElem,
        });
    }
    // validateField() {
    //     const validationResult = validate('message', this.data.message);
    //     if (validationResult && validationResult !== 'ok') {//Результат плохой
    //         this.setProps({
    //             sendBtn: new IconButton({
    //                 className: 'chat-dialog__send',
    //                 src: '/icons/arrow.svg',
    //                 alt: 'Отправить',
    //                 onClick: () => this.submitForm(),
    //             }),
    //             textField: new Textarea({
    //                 className: 'chat-dialog__text-field',
    //                 name: 'message',
    //                 id: 'message',
    //                 placeholder: validationResult,
    //                 text: '',
    //                 onInput: (val: string) => {
    //                     this.data.message = val;
    //                 },
    //             }),
    //         });
    //         return false;
    //     } else if (validationResult && validationResult === 'ok') {//Результат хороший
    //         this.setProps({
    //             sendBtn: new IconButton({
    //                 className: 'chat-dialog__send',
    //                 src: '/icons/arrow.svg',
    //                 alt: 'Отправить',
    //                 onClick: () => this.submitForm(),
    //             }),
    //             textField: new Textarea({
    //                 className: 'chat-dialog__text-field',
    //                 name: 'message',
    //                 id: 'message',
    //                 placeholder: 'Сообщение...',
    //                 text: this.data.message,
    //                 onInput: (val: string) => {
    //                     this.data.message = val;
    //                 },
    //             }),
    //         });
    //         return true;
    //     }//Результат пустой
    //     return true;
    // }
    render() {
        return `<div class="chat-dialog {{ className }}">
                    <div class="chat-dialog__header">
                        <div class="chat-dialog__header-left">
                            <img class="chat-dialog__user-avatar" alt="Аватар друга" src="/icons/favicon.png">
                            <div class="chat-dialog__user-name">{{{chatName}}}</div>
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

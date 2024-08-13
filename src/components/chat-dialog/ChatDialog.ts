import Block, { IProps } from '@/tools/Block';
import './chat-dialog.scss';
import { IconButton, Textarea, Button } from '@/components/index';
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
            addUserBtn: new Button({
                className: 'chat-dialog__add-user',
                text: 'Добавить пользователя',
                onClick: () => this.clickAddUser(),
            }),
            textField: null,
            sendBtn: new IconButton({
                className: 'chat-dialog__send',
                src: '/icons/arrow.svg',
                alt: 'Отправить',
                onClick: () => this.clickSendBtn(),
            }),
        });
        this.setProps({
            textField: this.textFieldElem,
        });
    }
    clickAddUser() {
        if (this.props.onAddUser) {
            this.props.onAddUser();
        }
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
    render() {
        return `<div class="chat-dialog {{ className }}">
                    <div class="chat-dialog__header">
                        <div class="chat-dialog__header-left">
                            <img class="chat-dialog__chat-avatar" alt="Аватар чата" src="/icons/favicon.png">
                            <div class="chat-dialog__chat-text">
                                <div class="chat-dialog__chat-name">{{{chatName}}}</div>
                                <div class="chat-dialog__chat-users">{{{chatUsers}}}</div>
                            </div>
                        </div>
                        <div class="chat-dialog__header-right">
                            {{{addUserBtn}}}
                            {{{deleteUserBtn}}}
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

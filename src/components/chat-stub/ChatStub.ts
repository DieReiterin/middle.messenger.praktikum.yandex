import Block, { IProps } from '@/tools/Block';
import { Subtitle, Button, InputField } from '@/components/index';
import './chat-stub.scss';

export default class ChatStub extends Block {
    private userId: string = '';
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new Subtitle({
                className: 'chat-stub__title',
                text: 'В этом чате вы пока одиноки...',
            }),
            subtitle: new Subtitle({
                className: 'chat-stub__subtitle',
                text: 'Выберите пользователя для общения',
            }),
            input: new InputField({
                className: 'login-page__input',
                label: 'Идентификатор',
                placeholder: 'введите id',
                name: 'user_id',
                id: 'user_id',
                onInput: (val: string) => {
                    this.userId = val;
                },
            }),
            subtitle2: new Subtitle({
                className: 'chat-stub__subtitle2',
                text: 'Например, id 1628 (логин Testovich3, пароль Testovich3)',
            }),
            btn: new Button({
                className: 'chat-stub__btn',
                text: 'Добавить пользователя',
                onClick: () => {
                    if (this.props.onClick) {
                        if (!this.userId) return;
                        this.props.onClick(this.userId);
                    }
                },
            }),
        });
    }

    render() {
        return `<div class="chat-stub {{ className }}">
                    <div class="chat-stub__top">
                        {{{ title }}}
                        {{{ subtitle }}}                    
                        {{{ input }}}                    
                        {{{ subtitle2 }}}                    
                    </div>
                    <div class="chat-stub__bottom">
                        {{{ btn }}}
                    </div>                    
                </div>
                `;
    }
}

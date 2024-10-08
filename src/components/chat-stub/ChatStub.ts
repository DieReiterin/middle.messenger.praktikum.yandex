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
                text:
                    props.type === 'deleteUser'
                        ? 'Удалить пользователя'
                        : 'Добавить пользователя',
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
            btn: new Button({
                className: 'chat-stub__btn',
                text:
                    props.type === 'deleteUser'
                        ? 'Удалить пользователя'
                        : 'Добавить пользователя',
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
                        {{{ input }}}                      
                    </div>
                    <div class="chat-stub__bottom">
                        {{{ btn }}}
                    </div>                    
                </div>
                `;
    }
}

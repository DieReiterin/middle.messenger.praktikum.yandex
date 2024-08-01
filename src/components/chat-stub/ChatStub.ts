import Block, { IProps } from '@/tools/Block';
import { Subtitle, Button } from '@/components/index';
import './chat-stub.scss';

export default class ChatStub extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            subtitle: new Subtitle({
                className: 'chat-stub__subtitle',
                text: 'Выберите пользователя для общения',
            }),
            btn: new Button({
                className: 'chat-stub__btn',
                text: 'Выбрать Testovich2',
                // onClick: () => {

                // }
            }),
            // events: {
            //     click: () => {
            //         this.clickChat();
            //     },
            // },
        });
    }

    // clickChat() {
    //     if (this.props.onClick) {
    //         this.props.onClick();
    //     }
    // }

    render() {
        return `<div class="chat-stub {{ className }}">
                    {{{ subtitle }}}
                    {{{ btn }}}
                </div>
                `;
    }
}

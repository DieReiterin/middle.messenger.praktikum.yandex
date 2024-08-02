import Block, { IProps } from '@/tools/Block';
import { Subtitle, Button } from '@/components/index';
import './chat-stub.scss';

export default class ChatStub extends Block {
    private Testovich3Id = '1628';
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new Subtitle({
                className: 'chat-stub__title',
                text: 'В этом чате только вы один...',
            }),
            subtitle: new Subtitle({
                className: 'chat-stub__subtitle',
                text: 'Выберите пользователя для общения',
            }),
            btn: new Button({
                className: 'chat-stub__btn',
                text: 'Выбрать Testovich3',
                onClick: () => {
                    if (this.props.onClick) {
                        this.props.onClick(this.Testovich3Id);
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
                    </div>
                    <div class="chat-stub__bottom">
                        {{{ btn }}}
                    </div>                    
                </div>
                `;
    }
}

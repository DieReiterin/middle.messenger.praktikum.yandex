import Block, { IProps } from '@/tools/Block';
import './chat-message.scss';

export default class ChatMessage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
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
        return `<div class="chat-message {{ className }}">
                    {{{ content }}}
                </div>
                `;
    }
}

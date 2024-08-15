import Block, { IProps } from '@/tools/Block';
import './chat-message.scss';

export default class ChatMessage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
    }

    render() {
        return `<div class="chat-message {{ className }}">
                    {{{ content }}}
                </div>
                `;
    }
}

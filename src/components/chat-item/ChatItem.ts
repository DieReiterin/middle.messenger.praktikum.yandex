import Block, { IProps } from '@/tools/Block';
import './chat-item.scss';

export default class ChatItem extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                click: () => {
                    this.clickChat();
                },
            },
        });
    }

    clickChat() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return `<div class="chat-item">
                    <div class="chat-item__line"></div>
                    <div class="chat-item__block {{#if current}}chat-item__block_current{{/if}}">
                        {{#if avatar}}
                        <div>
                            <img class="chat-item__avatar" alt="Аватар друга" src="{{ avatar }}">
                        </div>
                        {{else}}
                        <div class="chat-item__avatar"></div>
                        {{/if}}
                        <div class="chat-item__text">
                            <span class="chat-item__text-name">
                                {{ name }}
                            </span>
                            <span class="chat-item__text-message">
                                {{ message }}
                            </span>
                        </div>
                    </div>
                </div>
                `;
    }
}

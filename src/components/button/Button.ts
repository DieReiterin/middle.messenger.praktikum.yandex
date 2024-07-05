import Block, { IProps } from '@/tools/Block';
import './button.scss';

export default class Button extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.clickBtn();
                },
            },
        });
    }
    clickBtn() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return `<button 
            class="button {{className}}"
            {{#if type}}type="{{type}}"{{/if}}
        >{{text}}</button>`;
    }
}

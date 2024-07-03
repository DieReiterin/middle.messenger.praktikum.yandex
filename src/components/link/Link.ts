import Block from "../../tools/Block.ts";
import "./link.scss";

export default class Link extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.clickLink();
                },
            },
        });
    }
    clickLink() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return `<a  
                    class="link {{className}}"
                    {{#if href}}href="{{href}}"{{/if}}
                    {{#if action}}action="{{action}}"{{/if}}
                >{{text}}</a>`;
    }
}

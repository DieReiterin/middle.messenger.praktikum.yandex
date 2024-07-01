import Block from "../../tools/Block.ts";
import "./link.scss";

export default class Link extends Block {
    constructor(props?) {
        super({
            ...props,
        });
    }
    render() {
        // {{#if page}}page="{{page}}"{{/if}}
        return `<a  
                    class="link {{className}}"
                    href="{{href}}"
                    action="{{action}}"
                    page="{{page}}"
                >{{text}}</a>`;
    }
}

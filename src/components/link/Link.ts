import Block from "../../tools/Block.ts";
import "./link.scss";

export default class Link extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: () => console.log("link-event"),
            },
            attr: {
                class: `link`,
            },
        });
    }
    render() {
        return `<a
                    href="{{href}}"
                    class="{{className}}"
                    page="{{page}}"
                    action="{{action}}"
                >{{text}}</a>`;
    }
}

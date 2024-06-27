import Block from "../../tools/Block.ts";
import "./button.scss";

export default class Button extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: () => console.log("event"),
            },
        });
    }
    render() {
        return `<button class="button {{className}}" type="{{type}}" page="{{page}}">{{text}}</button>`;
    }
}

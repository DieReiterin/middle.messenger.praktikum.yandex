import Block from "../../tools/Block.ts";
import "./subtitle.scss";

export default class Subtitle extends Block {
    constructor(props?) {
        super({
            ...props,
        });
    }
    render() {
        return `<span class="subtitle {{className}}">{{text}}</span>`;
    }
}

//@ts-nocheck
import Block from "../../tools/Block.ts";
import "./button.scss";

export default class Button extends Block {
    constructor(props?) {
        super(props);
    }
    // componentDidMount() {
    //     this.setProps({
    //         click: () => {
    //             this.eventBus().emit("navigate");
    //         },
    //     });
    //     return true;
    // }
    override render() {
        return `<button class="button {{className}}" type="{{type}}" page="{{page}}">{{text}}</button>`;
    }
}

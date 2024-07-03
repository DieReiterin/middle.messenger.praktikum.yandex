import Block from "../../tools/Block.ts";
import "./icon-button.scss";

export default class IconButton extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.clickIcon();
                },
            },
        });
    }
    clickIcon() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return `<img class="icon-button {{className}}" src="{{src}}" alt="{{alt}}">`;
    }
}

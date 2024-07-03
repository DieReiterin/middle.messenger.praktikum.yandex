import Block from "../../tools/Block.ts";
import "./textarea.scss";

export default class Textarea extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                blur: () => this.blurTextarea(),
                input: (e) => {
                    this.enterText(e.target.value);
                },
            },
        });
    }
    blurTextarea() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    enterText(e) {
        if (this.props.onInput) {
            this.props.onInput(e);
        }
    }
    render() {
        return `<textarea
                    class="textarea {{className}}"
                    name="{{name}}"
                    id="{{id}}"
                    placeholder="{{placeholder}}"
                />{{text}}</textarea>
                `;
    }
}

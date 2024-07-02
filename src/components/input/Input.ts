import Block from "../../tools/Block.ts";
import "./input.scss";

export default class Input extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                blur: () => props.onBlur(),
                // change: (e) => props.onChange(e.target.value),
                input: (e) => {
                    props.onInput(e.target.value);
                },
            },
        });
    }
    render() {
        return `<input
                    name="{{name}}"
                    class="input"
                    type="text"
                    id="{{id}}"
                    placeholder="{{placeholder}}"
                    value="{{value}}"
                />`;
    }
}

import Block from "../../tools/Block.ts";
import { Input } from "../../components/index.ts";
import "./input-field.scss";

export default class InputField extends Block {
    constructor(props?) {
        super({
            ...props,
            input: new Input({
                name: props.name,
                id: props.id,
                placeholder: props.placeholder,
                value: props.value,
                onBlur: () => props.onBlur(),
                onInput: (val) => props.onInput(val),
            }),
            error: props.error,
        });
    }
    render() {
        return `<div class="input-field {{className}} {{#if typeProfile}}input-field_type-profile{{/if}}">
                    {{#if label}}
                        <label class="input-field__label" for="{{id}}">
                            {{label}}
                        </label>
                    {{/if}}
                    {{{input}}}
                    <label class="input-field__error" for="{{id}}">
                        {{error}}
                    </label>
                </div>
                `;
    }
}

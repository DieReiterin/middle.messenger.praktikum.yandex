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
                value: "",
                onBlur: () => this.validate(),
                onInput: (val) => (this.value = val),
                // onInput: (val) => props.onInput(val),
                // onBlur: () => props.onBlur(),
            }),
            error: "",
        });
    }
    value = "";
    error = "";
    validate() {
        this.error = "someErr";
        this.setProps({
            input: new Input({
                name: this.props.name,
                id: this.props.id,
                placeholder: this.props.placeholder,
                value: this.value,
                onBlur: () => this.validate(),
                onInput: (val) => this.props.onInput(val),
                // onInput: (val) => props.onInput(val),
                // onBlur: () => props.onBlur(),
            }),
            error: this.error,
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

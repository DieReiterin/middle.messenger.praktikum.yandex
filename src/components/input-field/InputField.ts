import Block from "../../tools/Block.ts";
import { Input } from "../../components/index.ts";
import "./input-field.scss";
import validate from "../../tools/validate.ts";

export default class InputField extends Block {
    constructor(props?) {
        super({
            ...props,
            input: new Input({
                typeProfile: props.typeProfile,
                name: props.name,
                id: props.id,
                placeholder: props.placeholder,
                value: "",
                onBlur: () => this.blurInput(),
                onInput: (val) => this.enterText(val),
            }),
            error: "",
        });
    }
    value = "";
    blurInput() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
        this.validateField();
    }
    enterText(val) {
        if (this.props.onInput) {
            this.props.onInput(val);
        }
        this.value = val;
    }
    validateField() {
        const validationResult = validate(this.props.name, this.value);
        if (validationResult && validationResult !== "ok") {
            this.setProps({
                input: new Input({
                    typeProfile: this.props.typeProfile,
                    name: this.props.name,
                    id: this.props.id,
                    placeholder: this.props.placeholder,
                    value: this.value,
                    onBlur: () => this.blurInput(),
                    onInput: (val) => this.enterText(val),
                }),
                error: validationResult,
            });
            return false;
        } else if (validationResult && validationResult === "ok") {
            this.setProps({
                input: new Input({
                    typeProfile: this.props.typeProfile,
                    name: this.props.name,
                    id: this.props.id,
                    placeholder: this.props.placeholder,
                    value: this.value,
                    onBlur: () => this.blurInput(),
                    onInput: (val) => this.enterText(val),
                }),
                error: "",
            });
            return true;
        }
        return true;
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

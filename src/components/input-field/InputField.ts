import Block from "../../tools/Block.ts";
import "./input-field.scss";

export default class InputField extends Block {
    constructor(props?) {
        super({
            ...props,
        });
    }
    render() {
        return `<div class="input-field {{className}} {{#if typeProfile}}input-field_type-profile{{/if}}">
                    {{#if label}}
                        <label class="input-field__label" for="{{id}}">
                            {{label}}
                        </label>
                    {{/if}}
                    <input
                        name="{{name}}"
                        class="input-field__control"
                        type="text"
                        id="{{id}}"
                        placeholder="{{placeholder}}"
                        value="{{value}}"
                    />
                    <label class="input-field__error" for="{{id}}">
                        {{error}}
                    </label>
                </div>
                `;
    }
}

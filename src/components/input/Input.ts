import Block, { IProps } from '@/tools/Block';
import './input.scss';

export default class Input extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                blur: () => this.blurInput(),
                input: (e: Event) => {
                    const val = (e.target as HTMLInputElement).value;
                    if (val) {
                        this.enterText(val);
                    }
                },
            },
        });
    }
    blurInput() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
    enterText(val: string) {
        if (this.props.onInput) {
            this.props.onInput(val);
        }
    }
    render() {
        return `<input
                    name="{{name}}"
                    class="input {{#if typeProfile}}input_type-profile{{/if}}"
                    type="text"
                    id="{{id}}"
                    placeholder="{{placeholder}}"
                    value="{{value}}"
                />`;
    }
}

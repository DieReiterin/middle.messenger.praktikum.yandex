import Block, { IProps } from '@/tools/Block';
import './textarea.scss';

export default class Textarea extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                blur: () => this.blurTextarea(),
                input: (e: Event) => {
                    const val = (e.target as HTMLTextAreaElement).value;
                    if (val) {
                        this.enterText(val);
                    }
                },
            },
        });
    }
    blurTextarea() {
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
        return `<textarea
                    class="textarea {{className}}"
                    name="{{name}}"
                    id="{{id}}"
                    placeholder="{{placeholder}}"
                />{{text}}</textarea>
                `;
    }
}

import Block, { IProps } from '@/tools/Block';
import './input-file.scss';

export default class InputFile extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                change: (e: Event) => {
                    const input = e.target as HTMLInputElement;
                    if (input.files && input.files[0]) {
                        this.selectFile(input.files[0]);
                    }
                },
            },
        });
    }
    selectFile(file: File) {
        if (this.props.onChange) {
            this.props.onChange(file);
        }
    }
    render() {
        return `<input
                    class="input-file {{className}}"
                    type="file"
                    name="{{name}}"
                    id="{{id}}"
                    accept="{{accept}}"
                />`;
    }
}

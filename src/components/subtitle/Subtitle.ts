import Block, { IProps } from '@/tools/Block';
import './subtitle.scss';

export default class Subtitle extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
    }
    render() {
        return '<span class="subtitle {{className}}">{{text}}</span>';
    }
}

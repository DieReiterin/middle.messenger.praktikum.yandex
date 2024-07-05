import Block, { IProps } from '@/tools/Block';
import './page-title.scss';

export default class PageTitle extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
    }
    render() {
        return `<h1 class="page-title {{className}}">
                    {{text}}
                </h1>`;
    }
}

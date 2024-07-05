import Block, { IProps } from '@/tools/Block';
import './layout-default.scss';

export default class LayoutDefault extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
    }
    override render() {
        return `<main class="layout-default" id="layout-content">
                </main>
                `;
    }
}

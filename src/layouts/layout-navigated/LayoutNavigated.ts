import Block, { IProps } from '@/tools/Block';
import { Footer } from '@/components/index';
import './layout-navigated.scss';

export default class LayoutNavigated extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            footer: new Footer({
                className: 'layout-navigated__footer',
            }),
        });
    }
    override render() {
        return `<main class="layout-navigated">
                    <div class="layout-navigated__content" id="layout-content">
                    </div>

                    {{{footer}}}
                </main>`;
    }
}

import Block, { IProps } from '@/tools/Block';
import './icon-button.scss';

export default class IconButton extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.clickIcon();
                },
            },
        });
    }
    clickIcon() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return '<img class="icon-button {{className}}" src="{{src}}" alt="{{alt}}">';
    }
}

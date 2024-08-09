import Block, { IProps } from '@/tools/Block';
import './image.scss';

export default class Image extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            src: '/images/default_profile.png',
            events: {
                click: (e) => {
                    e.preventDefault();
                    this.clickImage();
                },
            },
        });
    }
    clickImage() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
    render() {
        return `<div class="image {{className}} {{#if type}}image_default{{/if}}">
                    <img src="{{src}}" alt="{{alt}}" class="image__pic">
                </div>`;
    }
}

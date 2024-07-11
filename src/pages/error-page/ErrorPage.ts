import Block, { IProps } from '@/tools/Block';
import { PageTitle, Link } from '@/components/index';
import './error-page.scss';
import navigate from '@/tools/navigate';

export default class ErrorPage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new PageTitle({
                className: 'error-page__title',
                text: props.title,
            }),
            subtitle: new PageTitle({
                className: 'error-page__subtitle',
                text: props.subtitle,
            }),
            link: new Link({
                className: 'error-page__subtitle',
                text: 'Назад к чатам',
                onClick: () => navigate('page', 'chats'),
            }),
        });
    }
    override render() {
        return `<div class="error-page">
                    <div class="error-page__main">
                        {{{title}}} 
                        {{{subtitle}}} 
                        {{{link}}} 
                    </div>
                </div>
                `;
    }
}

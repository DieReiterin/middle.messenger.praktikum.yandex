import Block from "../../tools/Block.ts";
import { PageTitle, Link } from "../../components/index.ts";
import "./error-page.scss";

export default class ErrorPage extends Block {
    constructor(props) {
        super({
            ...props,
            title: new PageTitle({
                className: "error-page__title",
                text: props.title,
            }),
            subtitle: new PageTitle({
                className: "error-page__subtitle",
                text: props.subtitle,
            }),
            link: new Link({
                className: "error-page__subtitle",
                text: "Назад к чатам",
                page: "chats",
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

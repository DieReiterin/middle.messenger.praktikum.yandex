import Block from "../../tools/Block.ts";
import PageTitle from "../../components/page-title/PageTitle.ts";
import Link from "../../components/link/Link.ts";
import "./not-found-page.scss";
import "../../components/server-alert/server-alert.scss";

export default class NotFoundPage extends Block {
    constructor(props?) {
        super({
            ...props,
            title: new PageTitle({
                className: "server-alert__title",
                text: "400",
            }),
            subtitle: new PageTitle({
                className: "server-alert__subtitle",
                text: "Не туда попали",
            }),
            link: new Link({
                className: "chat",
                text: "Назад к чатам",
                page: "chat",
            }),
        });
    }
    override render() {
        return `<div class="not-found-page">
                    <div class="server-alert">
                        {{{title}}} 
                        {{{subtitle}}} 
                        {{{link}}} 
                    </div>
                </div>
                `;
    }
}

import Block from "../../tools/Block.ts";
import Footer from "../../components/footer/Footer.ts";
import "./layout-navigated.scss";

export default class LayoutNavigated extends Block {
    constructor(props?) {
        super({
            ...props,
            footer: new Footer({
                className: "layout-navigated__footer",
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

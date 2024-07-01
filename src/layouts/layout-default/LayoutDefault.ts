import Block from "../../tools/Block.ts";
import "./layout-default.scss";

export default class LayoutDefault extends Block {
    constructor(props?) {
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

import Block from "../../tools/Block.ts";
import Button from "../button/Button.ts";
import "./footer.scss";

export default class Footer extends Block {
    constructor(props?) {
        super({
            ...props,
            btn1: new Button({
                className: "footer__btn",
                page: "login",
                text: "Авторизация",
            }),
            btn2: new Button({
                className: "footer__btn",
                page: "signin",
                text: "Регистрация",
            }),
            btn3: new Button({
                className: "footer__btn",
                page: "chat",
                text: "Список чатов",
            }),
            btn4: new Button({
                className: "footer__btn",
                page: "profile",
                text: "Профиль",
            }),
            btn5: new Button({
                className: "footer__btn",
                page: "settings",
                text: "Настройки",
            }),
            btn6: new Button({
                className: "footer__btn",
                page: "not-found",
                text: "Страница 404",
            }),
            btn7: new Button({
                className: "footer__btn",
                page: "server-error",
                text: "Страница 5**",
            }),
        });
    }
    render() {
        return `<nav class="footer {{ className }}">
                    <div class="footer__content">
                        {{{btn1}}} 
                        {{{btn2}}} 
                        {{{btn3}}} 
                        {{{btn4}}} 
                        {{{btn5}}} 
                        {{{btn6}}} 
                        {{{btn7}}} 
                    </div>
                </nav>`;
    }
}

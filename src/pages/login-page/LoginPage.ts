import Block from "../../tools/Block.ts";
import Button from "../../components/button/Button.ts";
import Link from "../../components/link/Link.ts";
import PageTitle from "../../components/page-title/PageTitle.ts";
import InputField from "../../components/input-field/InputField.ts";
import "./login-page.scss";

export default class LoginPage extends Block {
    constructor(props?) {
        super({
            ...props,
            title: new PageTitle({
                className: "login-page__title",
                text: "Вход",
            }),
            input1: new InputField({
                className: "login-page__input",
                label: "Логин",
                placeholder: "введите логин",
                error: "",
                name: "login",
                id: "login",
            }),
            input2: new InputField({
                className: "login-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                error: "Неверный пароль",
                name: "password",
                id: "password",
            }),
            btn: new Button({
                className: "login-page__submit-btn",
                text: "Войти",
                page: "chat",
            }),
            link: new Link({
                className: "login-page__link",
                text: "Регистрация",
                page: "signin",
            }),
        });
    }
    override render() {
        return `<form class="login-page">
                    <div class="login-page__main">
                        {{{title}}} 
                        {{{input1}}}  
                        {{{input2}}}                          
                    </div>
                    <div class="login-page__footer">
                        {{{btn}}}    
                        {{{link}}}           
                    </div>
                </form>`;
    }
}

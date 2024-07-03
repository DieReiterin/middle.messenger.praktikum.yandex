import Block from "../../tools/Block.ts";
import { Button, Link, PageTitle, InputField } from "../../components/index.ts";
import "./login-page.scss";
import navigate from "../../tools/navigate.ts";

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
                name: "login",
                id: "login",
                onInput: (val) => {
                    this.data.login = val;
                },
            }),
            input2: new InputField({
                className: "login-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                name: "password",
                id: "password",
                onInput: (val) => {
                    this.data.password = val;
                },
            }),
            btn: new Button({
                className: "login-page__submit-btn",
                text: "Войти",
                onClick: () => this.submitForm(),
            }),
            link: new Link({
                className: "login-page__link",
                text: "Регистрация",
                onClick: () => navigate("page", "signin"),
            }),
        });
    }
    data = {
        login: "",
        password: "",
    };
    submitForm() {
        if (
            this.children.input1.validateField() &&
            this.children.input2.validateField()
        ) {
            console.log(this.data);
            navigate("page", "chats");
        }
    }
    override render() {
        return `<form class="login-page" action="">
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

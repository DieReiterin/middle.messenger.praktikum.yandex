import Block from "../../tools/Block.ts";
import { Button, Link, PageTitle, InputField } from "../../components/index.ts";
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
                name: "login",
                id: "login",
                onBlur: () => this.validate(),
                onInput: (val) => this.logger(val),
            }),
            input2: new InputField({
                className: "login-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                name: "password",
                id: "password",
                onBlur: () => this.validate(),
            }),
            btn: new Button({
                className: "login-page__submit-btn",
                text: "Войти",
                page: "chats",
            }),
            link: new Link({
                className: "login-page__link",
                text: "Регистрация",
                page: "signin",
            }),
        });
    }
    // data = "Неверный пароль";
    validate() {
        // this.setProps({
        //     input1: new InputField({
        //         className: "login-page__input",
        //         label: "Логин",
        //         placeholder: "введите логин",
        //         error: this.data,
        //         name: "login",
        //         id: "login",
        //         onBlur: () => this.validate(),
        //         onInput: (val) => this.logger(val),
        //     }),
        // });
        console.log("Here we call validation code on blur");
    }
    logger(val) {
        console.log("val");
        console.log(val);
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

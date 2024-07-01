import Block from "../../tools/Block.ts";
import { Button, Link, PageTitle, InputField } from "../../components/index.ts";
import "./signin-page.scss";

export default class SigninPage extends Block {
    constructor(props?) {
        super({
            ...props,
            title: new PageTitle({
                className: "signin-page__title",
                text: "Регистрация",
            }),
            input1: new InputField({
                className: "signin-page__input",
                label: "Почта",
                placeholder: "введите адрес",
                name: "email",
                id: "email",
            }),
            input2: new InputField({
                className: "signin-page__input",
                label: "Логин",
                placeholder: "введите логин",
                name: "login",
                id: "login",
            }),
            input3: new InputField({
                className: "signin-page__input",
                label: "Имя",
                placeholder: "введите имя",
                name: "first_name",
                id: "first_name",
            }),
            input4: new InputField({
                className: "signin-page__input",
                label: "Фамилия",
                placeholder: "введите фамилию",
                name: "second_name",
                id: "second_name",
            }),
            input5: new InputField({
                className: "signin-page__input",
                label: "Телефон",
                placeholder: "введите номер",
                name: "phone",
                id: "phone",
            }),
            input6: new InputField({
                className: "signin-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                name: "password",
                id: "password",
            }),
            input7: new InputField({
                className: "signin-page__input",
                label: "Пароль (ещё раз)",
                placeholder: "повторите пароль",
                name: "password-repeat",
                id: "password-repeat",
            }),
            btn: new Button({
                className: "signin-page__submit-btn",
                text: "Создать аккаунт",
                page: "chats",
            }),
            link: new Link({
                className: "signin-page__link",
                text: "Вход",
                page: "login",
            }),
        });
    }
    override render() {
        return `<form class="signin-page">
                    <div class="signin-page__main">
                        {{{title}}}
                        {{{input1}}}             
                        {{{input2}}}  
                        {{{input3}}}  
                        {{{input4}}}  
                        {{{input5}}}  
                        {{{input6}}}  
                        {{{input7}}}  
                    </div>
                    <div class="signin-page__footer">
                        {{{btn}}}    
                        {{{link}}}           
                    </div>
                </form>`;
    }
}

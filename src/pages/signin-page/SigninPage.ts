import Block from "../../tools/Block.ts";
import { Button, Link, PageTitle, InputField } from "../../components/index.ts";
import "./signin-page.scss";
import navigate from "../../tools/navigate.ts";

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
                onInput: (val) => {
                    this.data.email = val;
                },
            }),
            input2: new InputField({
                className: "signin-page__input",
                label: "Логин",
                placeholder: "введите логин",
                name: "login",
                id: "login",
                onInput: (val) => {
                    this.data.login = val;
                },
            }),
            input3: new InputField({
                className: "signin-page__input",
                label: "Имя",
                placeholder: "введите имя",
                name: "first_name",
                id: "first_name",
                onInput: (val) => {
                    this.data.first_name = val;
                },
            }),
            input4: new InputField({
                className: "signin-page__input",
                label: "Фамилия",
                placeholder: "введите фамилию",
                name: "second_name",
                id: "second_name",
                onInput: (val) => {
                    this.data.second_name = val;
                },
            }),
            input5: new InputField({
                className: "signin-page__input",
                label: "Телефон",
                placeholder: "введите номер",
                name: "phone",
                id: "phone",
                onInput: (val) => {
                    this.data.phone = val;
                },
            }),
            input6: new InputField({
                className: "signin-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                name: "password",
                id: "password",
                onInput: (val) => {
                    this.data.password = val;
                },
            }),
            input7: new InputField({
                className: "signin-page__input",
                label: "Пароль (ещё раз)",
                placeholder: "повторите пароль",
                name: "password-repeat",
                id: "password-repeat",
                onInput: (val) => {
                    this.data["password-repeat"] = val;
                },
            }),
            btn: new Button({
                className: "signin-page__submit-btn",
                text: "Создать аккаунт",
                onClick: () => this.submitForm(),
            }),
            link: new Link({
                className: "signin-page__link",
                text: "Вход",
                onClick: () => navigate("page", "login"),
            }),
        });
    }
    data = {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
        "password-repeat": "",
    };
    submitForm() {
        if (
            this.children.input1.validateField() &&
            this.children.input2.validateField() &&
            this.children.input3.validateField() &&
            this.children.input4.validateField() &&
            this.children.input5.validateField() &&
            this.children.input6.validateField() &&
            this.children.input7.validateField()
        ) {
            console.log(this.data);
            navigate("page", "login");
        }
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

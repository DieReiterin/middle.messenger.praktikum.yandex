import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './signup-page.scss';

export default class SigninPage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new PageTitle({
                className: 'signin-page__title',
                text: 'Регистрация',
            }),
            input1: new InputField({
                className: 'signin-page__input',
                label: 'Почта',
                placeholder: 'введите адрес',
                name: 'email',
                id: 'email',
                onInput: (val: string) => {
                    this.data.email = val;
                },
            }),
            input2: new InputField({
                className: 'signin-page__input',
                label: 'Логин',
                placeholder: 'введите логин',
                name: 'login',
                id: 'login',
                onInput: (val: string) => {
                    this.data.login = val;
                },
            }),
            input3: new InputField({
                className: 'signin-page__input',
                label: 'Имя',
                placeholder: 'введите имя',
                name: 'first_name',
                id: 'first_name',
                onInput: (val: string) => {
                    this.data.first_name = val;
                },
            }),
            input4: new InputField({
                className: 'signin-page__input',
                label: 'Фамилия',
                placeholder: 'введите фамилию',
                name: 'second_name',
                id: 'second_name',
                onInput: (val: string) => {
                    this.data.second_name = val;
                },
            }),
            input5: new InputField({
                className: 'signin-page__input',
                label: 'Телефон',
                placeholder: 'введите номер',
                name: 'phone',
                id: 'phone',
                onInput: (val: string) => {
                    this.data.phone = val;
                },
            }),
            input6: new InputField({
                className: 'signin-page__input',
                label: 'Пароль',
                placeholder: 'введите пароль',
                name: 'password',
                id: 'password',
                onInput: (val: string) => {
                    this.data.password = val;
                },
            }),
            input7: new InputField({
                className: 'signin-page__input',
                label: 'Пароль (ещё раз)',
                placeholder: 'повторите пароль',
                name: 'password-repeat',
                id: 'password-repeat',
                onInput: (val: string) => {
                    this.data['password-repeat'] = val;
                },
            }),
            btn: new Button({
                className: 'signin-page__submit-btn',
                text: 'Создать аккаунт',
                onClick: () => this.submitForm(),
            }),
            link: new Link({
                className: 'signin-page__link',
                text: 'Вход',
                onClick: () => window.router.go('/'),
            }),
        });
    }
    data = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        'password-repeat': '',
    };
    submitForm() {
        // const input1: unknown = this.children.input1;
        // const input2: unknown = this.children.input2;
        // const input3: unknown = this.children.input3;
        // const input4: unknown = this.children.input4;
        // const input5: unknown = this.children.input5;
        // const input6: unknown = this.children.input6;
        // const input7: unknown = this.children.input7;
        // if (
        //     (input1 as { validateField: () => boolean }).validateField() &&
        //     (input2 as { validateField: () => boolean }).validateField() &&
        //     (input3 as { validateField: () => boolean }).validateField() &&
        //     (input4 as { validateField: () => boolean }).validateField() &&
        //     (input5 as { validateField: () => boolean }).validateField() &&
        //     (input6 as { validateField: () => boolean }).validateField() &&
        //     (input7 as { validateField: () => boolean }).validateField()
        // ) {
        //     console.log(this.data);
        window.router.go('/');
        // }
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

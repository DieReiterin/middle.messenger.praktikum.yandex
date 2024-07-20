import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './signup-page.scss';
// import store from '@/tools/Store';
import connect from '@/tools/connect';
import UserSignupController from '@/controllers/user-signup';

const userSignupController = new UserSignupController();

class SignupPage extends Block {
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
                onClick: () => {
                    this.handleSignup();
                },
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

    async handleSignup() {
        console.log('handleSignup method called');

        const { email, login, first_name, second_name, phone, password } =
            this.data;
        try {
            await userSignupController.signup({
                email,
                login,
                first_name,
                second_name,
                phone,
                password,
            });
        } catch (error) {
            console.error('SignupPage Signup failed:', error);
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

export default connect(SignupPage);

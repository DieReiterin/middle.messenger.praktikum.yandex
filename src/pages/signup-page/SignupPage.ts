import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './signup-page.scss';
// import store from '@/tools/Store';
import connect from '@/tools/connect';
import UserSignupController from '@/controllers/user-signup';

const userSignupController = new UserSignupController();

class SignupPage extends Block {
    private alertElem: PageTitle = new PageTitle({
        className: 'signup-page__alert signup-page__alert_hidden',
        text: 'alertText',
    });
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new PageTitle({
                className: 'signup-page__title',
                text: 'Регистрация',
            }),
            input1: new InputField({
                className: 'signup-page__input',
                label: 'Почта',
                placeholder: 'введите адрес',
                name: 'email',
                id: 'email',
                onInput: (val: string) => {
                    this.data.email = val;
                },
            }),
            input2: new InputField({
                className: 'signup-page__input',
                label: 'Логин',
                placeholder: 'введите логин',
                name: 'login',
                id: 'login',
                onInput: (val: string) => {
                    this.data.login = val;
                },
            }),
            input3: new InputField({
                className: 'signup-page__input',
                label: 'Имя',
                placeholder: 'введите имя',
                name: 'first_name',
                id: 'first_name',
                onInput: (val: string) => {
                    this.data.first_name = val;
                },
            }),
            input4: new InputField({
                className: 'signup-page__input',
                label: 'Фамилия',
                placeholder: 'введите фамилию',
                name: 'second_name',
                id: 'second_name',
                onInput: (val: string) => {
                    this.data.second_name = val;
                },
            }),
            input5: new InputField({
                className: 'signup-page__input',
                label: 'Телефон',
                placeholder: 'введите номер',
                name: 'phone',
                id: 'phone',
                onInput: (val: string) => {
                    this.data.phone = val;
                },
            }),
            input6: new InputField({
                className: 'signup-page__input',
                label: 'Пароль',
                placeholder: 'введите пароль',
                name: 'password',
                id: 'password',
                onInput: (val: string) => {
                    this.data.password = val;
                },
            }),
            input7: new InputField({
                className: 'signup-page__input',
                label: 'Пароль (ещё раз)',
                placeholder: 'повторите пароль',
                name: 'password-repeat',
                id: 'password-repeat',
                onInput: (val: string) => {
                    this.data['password-repeat'] = val;
                },
            }),
            alert: null,
            btn: new Button({
                className: 'signup-page__submit-btn',
                text: 'Создать аккаунт',
                onClick: () => {
                    this.handleSignup();
                },
            }),
            link: new Link({
                className: 'signup-page__link',
                text: 'Вход',
                onClick: () => window.router.go('/'),
            }),
        });
        this.setProps({
            alert: this.alertElem,
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

    showAlert(alertText: string) {
        if (!alertText) {
            return;
        }
        this.alertElem.setProps({
            className: 'signup-page__alert',
            text: alertText,
        });
        this.setProps({
            alert: this.alertElem,
        });
    }
    hideAlert() {
        this.alertElem.setProps({
            className: 'signup-page__alert signup-page__alert_hidden',
        });
        this.setProps({
            alert: this.alertElem,
        });
    }

    async handleSignup() {
        // console.log('handleSignup method called');

        const { email, login, first_name, second_name, phone, password } =
            this.data;
        try {
            const response = await userSignupController.signup({
                email,
                login,
                first_name,
                second_name,
                phone,
                password,
            });
            if (!response) return;

            if (response === 'OK') {
                window.router.go('/messenger');
            } else if (typeof response === 'string') {
                this.showAlert(response);
            } else if (typeof response !== 'string' && 'reason' in response) {
                this.showAlert(response.reason);
                return;
            }
        } catch (error) {
            console.error('SignupPage Signup failed:', error);
        }
    }

    override render() {
        return `<form class="signup-page">
                    <div class="signup-page__main">
                        {{{title}}}
                        {{{input1}}}             
                        {{{input2}}}  
                        {{{input3}}}  
                        {{{input4}}}  
                        {{{input5}}}  
                        {{{input6}}}  
                        {{{input7}}}  
                        {{{alert}}}   
                    </div>
                    <div class="signup-page__footer">
                        {{{btn}}}    
                        {{{link}}}           
                    </div>
                </form>`;
    }
}

export default connect(SignupPage);

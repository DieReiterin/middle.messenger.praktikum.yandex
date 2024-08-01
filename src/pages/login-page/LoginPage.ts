import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './login-page.scss';
// import store from '@/tools/Store';
import connect from '@/tools/connect';
import UserLoginController from '@/controllers/user-login';

const userLoginController = new UserLoginController();

class LoginPage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            title: new PageTitle({
                className: 'login-page__title',
                text: 'Вход',
            }),
            input1: new InputField({
                className: 'login-page__input',
                label: 'Логин',
                placeholder: 'введите логин',
                name: 'login',
                id: 'login',
                onInput: (val: string) => {
                    this.data.login = val;
                },
            }),
            input2: new InputField({
                className: 'login-page__input',
                label: 'Пароль',
                placeholder: 'введите пароль',
                name: 'password',
                id: 'password',
                onInput: (val: string) => {
                    this.data.password = val;
                },
            }),
            btn: new Button({
                className: 'login-page__submit-btn',
                text: 'Войти',
                onClick: () => {
                    this.handleLogin();
                },
            }),
            link: new Link({
                className: 'login-page__link',
                text: 'Регистрация',
                onClick: () => window.router.go('/sign-up'),
                // text: store.getState().buttonText,
            }),
        });
    }
    async handleLogin() {
        console.log('handleLogin method called');

        const { login, password } = this.data;
        try {
            await userLoginController.login({ login, password });
            this.getUserInfo();
            window.router.go('/messenger');
        } catch (error) {
            console.error('handleLogin method failed:', error);
        }
    }

    async getUserInfo() {
        console.log('getUserInfo method called');

        try {
            await userLoginController.getInfo();
        } catch (error) {
            console.error('LoginPage getUserInfo failed:', error);
        }
    }

    data = {
        login: '',
        password: '',
    };

    override render() {
        return `<div class="login-page__wrapper">
                    <form class="login-page" action="">
                        <div class="login-page__main">
                            {{{title}}} 
                            {{{input1}}}  
                            {{{input2}}}                          
                        </div>
                        <div class="login-page__footer">
                            {{{btn}}}    
                            {{{link}}}           
                        </div>
                    </form>
                </div>`;
    }
}

export default connect(LoginPage);

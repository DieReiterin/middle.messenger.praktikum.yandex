import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './login-page.scss';
// import store from '@/tools/Store';
import connect from '@/tools/connect';
import UserLoginController from '@/controllers/user-login';

const userLoginController = new UserLoginController();

class LoginPage extends Block {
    private alertElem: PageTitle = new PageTitle({
        className: 'login-page__alert login-page__alert_hidden',
        text: 'alertText',
    });
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
            alert: null,
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
        this.setProps({
            alert: this.alertElem,
        });
    }

    showAlert(alertText: string) {
        if (!alertText) {
            return;
        }
        this.alertElem.setProps({
            className: 'login-page__alert',
            text: alertText,
        });
        this.setProps({
            alert: this.alertElem,
        });
    }
    hideAlert() {
        this.alertElem.setProps({
            className: 'login-page__alert login-page__alert_hidden',
        });
        this.setProps({
            alert: this.alertElem,
        });
    }

    async handleLogin() {
        console.log('handleLogin method called');

        const { login, password } = this.data;
        try {
            const response = await userLoginController.login({
                login,
                password,
            });

            if (response === 'OK') {
                this.getUserInfo();
                window.router.go('/messenger');
            } else if (typeof response === 'string') {
                this.showAlert(response);
            } else if (typeof response !== 'string' && 'reason' in response) {
                this.showAlert(response.reason);
            }
        } catch (error) {
            throw error;
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
                            {{{alert}}}                          
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

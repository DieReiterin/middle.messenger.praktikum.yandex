import Block, { IProps } from '@/tools/Block';
import { Button, Link, PageTitle, InputField } from '@/components/index';
import './login-page.scss';
import navigate from '@/tools/navigate';

export default class LoginPage extends Block {
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
                onClick: () => this.submitForm(),
            }),
            link: new Link({
                className: 'login-page__link',
                text: 'Регистрация',
                onClick: () => navigate('page', 'signin'),
            }),
        });
    }
    data = {
        login: '',
        password: '',
    };
    submitForm() {
        const input1: unknown = this.children.input1;
        const input2: unknown = this.children.input2;
        if (
            (input1 as { validateField: () => boolean }).validateField() &&
            (input2 as { validateField: () => boolean }).validateField()
        ) {
            console.log(this.data);
            navigate('page', 'chats');
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

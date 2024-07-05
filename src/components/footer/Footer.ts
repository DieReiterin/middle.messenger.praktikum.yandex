import Block, { IProps } from '@/tools/Block';
import { Button } from '@/components/index';
import './footer.scss';
import navigate from '@/tools/navigate';

export default class Footer extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            nav: null,
            btn1: new Button({
                className: 'footer__btn',
                text: 'Авторизация',
                onClick: () => navigate('page', 'login'),
            }),
            btn2: new Button({
                className: 'footer__btn',
                text: 'Регистрация',
                onClick: () => navigate('page', 'signin'),
            }),
            btn3: new Button({
                className: 'footer__btn',
                text: 'Список чатов',
                onClick: () => navigate('page', 'chats'),
            }),
            btn4: new Button({
                className: 'footer__btn',
                text: 'Профиль',
                onClick: () => navigate('page', 'profile'),
            }),
            btn5: new Button({
                className: 'footer__btn',
                text: 'Настройки',
                onClick: () => navigate('page', 'settings'),
            }),
            btn6: new Button({
                className: 'footer__btn',
                text: 'Страница 404',
                onClick: () => navigate('page', 'not-found'),
            }),
            btn7: new Button({
                className: 'footer__btn',
                text: 'Страница 5**',
                onClick: () => navigate('page', 'server-error'),
            }),
        });
    }
    render() {
        return `<nav class="footer {{ className }}">
                    <div class="footer__content">
                        {{{btn1}}} 
                        {{{btn2}}} 
                        {{{btn3}}} 
                        {{{btn4}}} 
                        {{{btn5}}} 
                        {{{btn6}}} 
                        {{{btn7}}} 
                    </div>
                </nav>`;
    }
}

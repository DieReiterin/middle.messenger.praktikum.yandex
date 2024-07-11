import Block, { IProps } from '@/tools/Block';
import { Button } from '@/components/index';
import './footer.scss';

export default class Footer extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            nav: null,
            btn1: new Button({
                className: 'footer__btn',
                text: 'Авторизация',
                onClick: () => window.router.go('/'),
            }),
            btn2: new Button({
                className: 'footer__btn',
                text: 'Регистрация',
                onClick: () => window.router.go('/signup'),
            }),
            btn3: new Button({
                className: 'footer__btn',
                text: 'Список чатов',
                onClick: () => window.router.go('/messenger'),
            }),
            btn4: new Button({
                className: 'footer__btn',
                text: 'Профиль',
                onClick: () => window.router.go('/settings'),
            }),
            // btn5: new Button({
            //     className: 'footer__btn',
            //     text: 'Настройки',
            //     onClick: () => navigate('page', 'settings'),
            // }),
            btn6: new Button({
                className: 'footer__btn',
                text: 'Страница 404',
                onClick: () => window.router.go('/error'),
            }),
            // btn7: new Button({
            //     className: 'footer__btn',
            //     text: 'Страница 5**',
            //     onClick: () => navigate('page', 'server-error'),
            // }),
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

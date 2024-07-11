import Block, { IProps } from '@/tools/Block';
import { Subtitle, Link } from '@/components/index';

import './profile-content.scss';

export default class ProfileContent extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            emailTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Почта',
            }),
            email: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: 'pochta@yandex.ru',
            }),
            loginTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Логин',
            }),
            login: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: 'ivanivanov',
            }),
            nameTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Имя',
            }),
            name: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: 'Иван',
            }),
            surnameTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Фамилия',
            }),
            surname: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: 'Иванов',
            }),
            displayNameTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Имя в чате',
            }),
            displayName: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: 'Иван',
            }),
            phoneTitle: new Subtitle({
                className: 'profile-content__row-title subtitle_bold',
                text: 'Телефон',
            }),
            phone: new Subtitle({
                className: 'profile-content__row-text subtitle_grey',
                text: '+7 (909) 967 30 30',
            }),
            editData: new Link({
                className: 'profile-content__link',
                text: 'Изменить данные',
                onClick: () => this.props.onEdit(),
            }),
            editPassword: new Link({
                className: 'profile-content__link link_disabled',
                text: 'Изменить пароль',
            }),
            signout: new Link({
                className: 'profile-content__link link_red',
                text: 'Выйти',
                onClick: () => window.router.go('/'),
            }),
        });
    }
    render() {
        return `<div class="profile-content">
            <div class="profile-content__main">
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{emailTitle}}}
                    {{{email}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{loginTitle}}}
                    {{{login}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{nameTitle}}}
                    {{{name}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{surnameTitle}}}
                    {{{surname}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{displayNameTitle}}}
                    {{{displayName}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{phoneTitle}}}
                    {{{phone}}}
                </div>
            </div>
            <div class="profile-content__footer">
                <div class="profile-content__row profile-content__row_content-align-left">
                    {{{editData}}}
                </div>
                <div class="profile-content__row profile-content__row_content-align-left">
                    {{{editPassword}}}
                </div>
                <div class="profile-content__row profile-content__row_content-align-left">
                    {{{signout}}}
                </div>
            </div>
        </div>
        `;
    }
}

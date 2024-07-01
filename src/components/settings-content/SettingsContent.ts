import Block from "../../tools/Block.ts";
import { Subtitle, InputField, Button } from "../../components/index.ts";
import "./settings-content.scss";

export default class SettingsContent extends Block {
    constructor(props?) {
        super({
            ...props,
            emailTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Почта",
            }),
            email: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "pochta@yandex.ru",
                name: "email",
                id: "email",
            }),
            loginTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Логин",
            }),
            login: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "ivanivanov",
                name: "login",
                id: "login",
            }),
            nameTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Имя",
            }),
            name: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "Иван",
                name: "first_name",
                id: "first_name",
            }),
            surnameTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Фамилия",
            }),
            surname: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "Иванов",
                name: "second_name",
                id: "second_name",
            }),
            displayNameTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Имя в чате",
            }),
            displayName: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "Иван",
                name: "display_name",
                id: "display_name",
            }),
            phoneTitle: new Subtitle({
                className: "settings-content__row-title subtitle_bold",
                text: "Телефон",
            }),
            phone: new InputField({
                className: "settings-content__row-text",
                typeProfile: "true",
                placeholder: "+7 (909) 967 30 30",
                name: "display_name",
                id: "display_name",
            }),
            saveChanges: new Button({
                className: "settings-content__btn",
                text: "Сохранить",
                events: {
                    click: () => this.props.onSave(),
                },
                // page: "profile",
                // events: {
                //     click: () => this.props.onEdit(),
                // },
            }),
        });
    }
    render() {
        return `<form class="settings-content">
                    <div class="settings-content__main">
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{emailTitle}}} 
                            {{{email}}} 
                        </div>
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{loginTitle}}} 
                            {{{login}}} 
                        </div>
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{nameTitle}}} 
                            {{{name}}}
                        </div>
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{surnameTitle}}} 
                            {{{surname}}}
                        </div>
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{displayNameTitle}}} 
                            {{{displayName}}}
                        </div>
                        <div class="settings-content__row settings-content__row_content-spaced">
                            {{{phoneTitle}}} 
                            {{{phone}}}
                        </div>
                    </div>
                    <div class="settings-content__footer">
                        <div class="settings-content__row settings-content__row_content-align-center">
                            {{{saveChanges}}} 
                        </div>
                    </div>
                </form>
                `;
    }
}

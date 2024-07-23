import Block, { IProps } from '@/tools/Block';
import { Subtitle, InputField, Button } from '@/components/index';
import './settings-content.scss';
import connect from '@/tools/connect';

class SettingsContent extends Block {
    private emailTitleElem: Subtitle;
    private emailElem: InputField;

    private loginTitleElem: Subtitle;
    private loginElem: InputField;

    private nameTitleElem: Subtitle;
    private nameElem: InputField;

    private surnameTitleElem: Subtitle;
    private surnameElem: InputField;

    private displayNameTitleElem: Subtitle;
    private displayNameElem: InputField;

    private phoneTitleElem: Subtitle;
    private phoneElem: InputField;

    private saveChangesElem: Button;

    constructor(props: IProps = {}) {
        super({
            ...props,
        });
        this.emailTitleElem = new Subtitle({
            text: 'Почта',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.emailElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.email',
            name: 'email',
            id: 'email',
            onInput: (val: string) => {
                this.data.email = val;
            },
        });

        this.loginTitleElem = new Subtitle({
            text: 'Логин',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.loginElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.login',
            name: 'login',
            id: 'login',
            onInput: (val: string) => {
                this.data.login = val;
            },
        });

        this.nameTitleElem = new Subtitle({
            text: 'Имя',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.nameElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.first_name',
            name: 'first_name',
            id: 'first_name',
            onInput: (val: string) => {
                this.data.first_name = val;
            },
        });

        this.surnameTitleElem = new Subtitle({
            text: 'Фамилия',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.surnameElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.second_name',
            name: 'second_name',
            id: 'second_name',
            onInput: (val: string) => {
                this.data.second_name = val;
            },
        });

        this.displayNameTitleElem = new Subtitle({
            text: 'Имя в чате',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.displayNameElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.display_name',
            name: 'display_name',
            id: 'display_name',
            onInput: (val: string) => {
                this.data.display_name = val;
            },
        });

        this.phoneTitleElem = new Subtitle({
            text: 'Телефон',
            className: 'settings-content__row-title subtitle_bold',
        });
        this.phoneElem = new InputField({
            className: 'settings-content__row-text',
            typeProfile: 'true',
            placeholder: 'profile.phone',
            name: 'phone',
            id: 'phone',
            onInput: (val: string) => {
                this.data.phone = val;
            },
        });

        this.saveChangesElem = new Button({
            className: 'settings-content__btn',
            text: 'Сохранить',
            onClick: () => this.submitForm(),
        });

        this.setProps({
            emailTitle: this.emailTitleElem,
            email: this.emailElem,

            loginTitle: this.loginTitleElem,
            login: this.loginElem,

            nameTitle: this.nameTitleElem,
            name: this.nameElem,

            surnameTitle: this.surnameTitleElem,
            surname: this.surnameElem,

            displayNameTitle: this.displayNameTitleElem,
            displayName: this.displayNameElem,

            phoneTitle: this.phoneTitleElem,
            phone: this.phoneElem,

            saveChanges: this.saveChangesElem,
        });
    }

    data = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
    };

    submitForm() {
        const email: unknown = this.children.email;
        const login: unknown = this.children.login;
        const name: unknown = this.children.name;
        const surname: unknown = this.children.surname;
        const displayName: unknown = this.children.displayName;
        const phone: unknown = this.children.phone;
        if (
            (email as { validateField: () => boolean }).validateField() &&
            (login as { validateField: () => boolean }).validateField() &&
            (name as { validateField: () => boolean }).validateField() &&
            (surname as { validateField: () => boolean }).validateField() &&
            (displayName as { validateField: () => boolean }).validateField() &&
            (phone as { validateField: () => boolean }).validateField()
        ) {
            console.log(this.data);
            this.props.onSave();
        }
    }

    componentDidMount() {
        const { profile } = this.props;
        // console.log(profile);

        if (profile) {
            this.emailElem.setProps({ text: profile.email });
            this.loginElem.setProps({ text: profile.login });
            this.nameElem.setProps({ text: profile.first_name });
            this.surnameElem.setProps({ text: profile.second_name });
            this.displayNameElem.setProps({ text: profile.display_name });
            this.phoneElem.setProps({ text: profile.phone });
        }
    }

    override render() {
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

export default connect(SettingsContent);

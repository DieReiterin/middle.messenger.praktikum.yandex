import Block, { IProps } from '@/tools/Block';
import { Subtitle, InputField, Link, Button } from '@/components/index';
import './profile-content.scss';
import store from '@/tools/Store';
import connect from '@/tools/connect';
import ProfileController from '@/controllers/profile';

const profileController = new ProfileController();

class ProfileContent extends Block {
    private emailElem: Subtitle;
    private loginElem: Subtitle;
    private firstNameElem: Subtitle;
    private secondNameElem: Subtitle;
    private displayNameElem: Subtitle;
    private phoneElem: Subtitle;

    private data = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
    };

    constructor(props: IProps = {}) {
        super({
            ...props,
        });
        this.emailElem = new Subtitle({
            text: 'profile.email',
            className: 'profile-content__row-text subtitle_grey',
        });
        this.loginElem = new Subtitle({
            text: 'profile.login',
            className: 'profile-content__row-text subtitle_grey',
        });
        this.firstNameElem = new Subtitle({
            text: 'profile.first_name',
            className: 'profile-content__row-text subtitle_grey',
        });
        this.secondNameElem = new Subtitle({
            text: 'profile.second_name',
            className: 'profile-content__row-text subtitle_grey',
        });
        this.displayNameElem = new Subtitle({
            text: 'profile.display_name',
            className: 'profile-content__row-text subtitle_grey',
        });
        this.phoneElem = new Subtitle({
            text: 'profile.phone',
            className: 'profile-content__row-text subtitle_grey',
        });

        this.setProps({
            emailTitle: new Subtitle({
                text: 'Почта',
                className: 'profile-content__row-title subtitle_bold',
            }),
            loginTitle: new Subtitle({
                text: 'Логин',
                className: 'profile-content__row-title subtitle_bold',
            }),
            firstNameTitle: new Subtitle({
                text: 'Имя',
                className: 'profile-content__row-title subtitle_bold',
            }),
            secondNameTitle: new Subtitle({
                text: 'Фамилия',
                className: 'profile-content__row-title subtitle_bold',
            }),
            displayNameTitle: new Subtitle({
                text: 'Имя в чате',
                className: 'profile-content__row-title subtitle_bold',
            }),
            phoneTitle: new Subtitle({
                text: 'Телефон',
                className: 'profile-content__row-title subtitle_bold',
            }),
            editData: new Link({
                className: 'profile-content__link',
                text: 'Изменить данные',
                onClick: () => this.editProfile(),
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

            email: this.emailElem,
            login: this.loginElem,
            firstName: this.firstNameElem,
            secondName: this.secondNameElem,
            displayName: this.displayNameElem,
            phone: this.phoneElem,
        });
    }

    editProfile() {
        const { profile } = this.props;
        this.setProps({
            email: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.email,
                name: 'email',
                id: 'email',
                onInput: (val: string) => {
                    this.data.email = val;
                },
            }),
            login: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.login,
                name: 'login',
                id: 'login',
                onInput: (val: string) => {
                    this.data.login = val;
                },
            }),
            firstName: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.first_name,
                name: 'first_name',
                id: 'first_name',
                onInput: (val: string) => {
                    this.data.first_name = val;
                },
            }),
            secondName: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.second_name,
                name: 'second_name',
                id: 'second_name',
                onInput: (val: string) => {
                    this.data.second_name = val;
                },
            }),
            displayName: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.display_name,
                name: 'display_name',
                id: 'display_name',
                onInput: (val: string) => {
                    this.data.display_name = val;
                },
            }),
            phone: new InputField({
                className: 'profile-content__row-text',
                typeProfile: 'true',
                placeholder: profile.phone,
                name: 'phone',
                id: 'phone',
                onInput: (val: string) => {
                    this.data.phone = val;
                },
            }),
        });
        this.setProps({
            editData: new Link({
                className: 'profile-content__link link_disabled',
                text: 'Изменить данные',
            }),
            saveChanges: new Button({
                className: 'settings-content__btn',
                text: 'Сохранить',
                onClick: () => this.requestChangeProfile(),
            }),
        });
    }

    updateStoreAndRerender() {
        this.setProps({
            email: new Subtitle({
                text: this.data.email,
                className: 'profile-content__row-text subtitle_grey',
            }),
            login: new Subtitle({
                text: this.data.login,
                className: 'profile-content__row-text subtitle_grey',
            }),
            firstName: new Subtitle({
                text: this.data.first_name,
                className: 'profile-content__row-text subtitle_grey',
            }),
            secondName: new Subtitle({
                text: this.data.second_name,
                className: 'profile-content__row-text subtitle_grey',
            }),
            displayName: new Subtitle({
                text: this.data.display_name,
                className: 'profile-content__row-text subtitle_grey',
            }),
            phone: new Subtitle({
                text: this.data.phone,
                className: 'profile-content__row-text subtitle_grey',
            }),
        });
        this.setProps({
            editData: new Link({
                className: 'profile-content__link',
                text: 'Изменить данные',
                onClick: () => this.editProfile(),
            }),
            saveChanges: new Button({
                className: 'settings-content__btn button_hidden',
                text: 'Сохранить',
            }),
        });

        store.dispatch({
            type: 'SET_PROFILE',
            profile: this.data,
        });
    }

    componentDidUpdate(): boolean {
        const { profile } = this.props;

        if (profile) {
            this.data = profile;

            this.emailElem.setProps({ text: profile.email });
            this.loginElem.setProps({ text: profile.login });
            this.firstNameElem.setProps({ text: profile.first_name });
            this.secondNameElem.setProps({ text: profile.second_name });
            this.displayNameElem.setProps({ text: profile.display_name });
            this.phoneElem.setProps({ text: profile.phone });
        }
        return true;
    }

    async requestChangeProfile() {
        console.log('requestChangeProfile method called');

        const { email, login, first_name, second_name, display_name, phone } =
            this.data;
        try {
            await profileController.changeProfile({
                email,
                login,
                first_name,
                second_name,
                display_name,
                phone,
            });
            this.updateStoreAndRerender();
        } catch (error) {
            console.error(error);
        } finally {
            console.log(this.props.profile);
        }
    }

    override render() {
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
                    {{{firstNameTitle}}}
                    {{{firstName}}}
                </div>
                <div class="profile-content__row profile-content__row_content-spaced">
                    {{{secondNameTitle}}}
                    {{{secondName}}}
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
                <div class="profile-content__row profile-content__row_content-align-center">
                    {{{saveChanges}}} 
                </div>
            </div>
        </div>
        `;
    }
}

export default connect(ProfileContent);

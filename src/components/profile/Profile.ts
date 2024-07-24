import Block, { IProps } from '@/tools/Block';
import { Subtitle, InputField, Link, Button } from '@/components/index';
import './profile.scss';
import store from '@/tools/Store';
import connect from '@/tools/connect';
import ProfileController from '@/controllers/profile';
import UserLoginController from '@/controllers/user-login';

const profileController = new ProfileController();
const userLoginController = new UserLoginController();

class Profile extends Block {
    private profileTitleElem: Subtitle = new Subtitle({
        text: 'profile.display_name',
    });

    private emailElem: Subtitle = new Subtitle({
        text: 'profile.email',
        className: 'profile-content__row-text subtitle_grey',
    });
    private loginElem: Subtitle = new Subtitle({
        text: 'profile.login',
        className: 'profile-content__row-text subtitle_grey',
    });
    private firstNameElem: Subtitle = new Subtitle({
        text: 'profile.first_name',
        className: 'profile-content__row-text subtitle_grey',
    });
    private secondNameElem: Subtitle = new Subtitle({
        text: 'profile.second_name',
        className: 'profile-content__row-text subtitle_grey',
    });
    private displayNameElem: Subtitle = new Subtitle({
        text: 'profile.display_name',
        className: 'profile-content__row-text subtitle_grey',
    });
    private phoneElem: Subtitle = new Subtitle({
        text: 'profile.phone',
        className: 'profile-content__row-text subtitle_grey',
    });

    private oldPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile-content__row-text subtitle_grey',
    });
    private newPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile-content__row-text subtitle_grey',
    });
    private repeatPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile-content__row-text subtitle_grey',
    });

    private data = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        password: '',
        old_password: '',
        new_password: '',
        repeat_password: '',
    };
    // private profileMode = 'default';
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
        this.initTitles();
        this.initControls();
        this.initComponents();
    }

    initTitles(type: string = 'default') {
        if (type === 'default') {
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
                oldPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile-content__row-title subtitle_bold',
                }),
                newPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile-content__row-title subtitle_bold',
                }),
                repeatPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile-content__row-title subtitle_bold',
                }),
            });
        } else if (type === 'onEditPassword') {
            this.setProps({
                oldPasswordTitle: new Subtitle({
                    text: 'Старый пароль',
                    className: 'profile-content__row-title subtitle_bold',
                }),
                newPasswordTitle: new Subtitle({
                    text: 'Новый пароль',
                    className: 'profile-content__row-title subtitle_bold',
                }),
                repeatPasswordTitle: new Subtitle({
                    text: 'Повторите новый пароль',
                    className: 'profile-content__row-title subtitle_bold',
                }),
            });
        }
    }
    initControls(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                editData: new Link({
                    className: 'profile-content__link',
                    text: 'Изменить данные',
                    onClick: () => this.editProfile(),
                }),
                editPassword: new Link({
                    className: 'profile-content__link',
                    text: 'Изменить пароль',
                    onClick: () => this.editPassword(),
                }),
                signout: new Link({
                    className: 'profile-content__link link_red',
                    text: 'Выйти',
                    onClick: () => this.requestLogout(),
                }),
                saveChanges: new Button({
                    className: 'settings-content__btn button_hidden',
                    text: 'Сохранить',
                }),
            });
        } else if (type === 'onEditProfile') {
            this.setProps({
                editData: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Изменить данные',
                }),
                editPassword: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Изменить пароль',
                }),
                signout: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Выйти',
                }),
                saveChanges: new Button({
                    className: 'settings-content__btn',
                    text: 'Сохранить',
                    onClick: () => this.requestChangeProfile(),
                }),
            });
        } else if (type === 'onEditPassword') {
            this.setProps({
                editData: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Изменить данные',
                }),
                editPassword: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Изменить пароль',
                }),
                signout: new Link({
                    className: 'profile-content__link link_disabled',
                    text: 'Выйти',
                }),
                saveChanges: new Button({
                    className: 'settings-content__btn',
                    text: 'Сохранить',
                    onClick: () => this.requestChangePassword(),
                }),
            });
        }
    }
    initComponents(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                profileTitle: this.profileTitleElem,

                email: this.emailElem,
                login: this.loginElem,
                firstName: this.firstNameElem,
                secondName: this.secondNameElem,
                displayName: this.displayNameElem,
                phone: this.phoneElem,

                oldPassword: this.oldPasswordElem,
                newPassword: this.newPasswordElem,
                repeatPassword: this.repeatPasswordElem,
            });
        } else if (type === 'onEditProfile') {
            const { profile } = this.props;
            this.setProps({
                email: new InputField({
                    className: 'profile-content__row-text',
                    typeProfile: 'true',
                    placeholder: profile.email,
                    value: profile.email,
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
                    value: profile.login,
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
                    value: profile.first_name,
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
                    value: profile.second_name,
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
                    value: profile.display_name,
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
                    value: profile.phone,
                    name: 'phone',
                    id: 'phone',
                    onInput: (val: string) => {
                        this.data.phone = val;
                    },
                }),
            });
        } else if (type === 'onEditPassword') {
            this.setProps({
                oldPassword: new InputField({
                    className: 'profile-content__row-text',
                    typeProfile: 'true',
                    placeholder: 'Старый пароль',
                    name: 'old_password',
                    id: 'old_password',
                    onInput: (val: string) => {
                        this.data.old_password = val;
                    },
                }),
                newPassword: new InputField({
                    className: 'profile-content__row-text',
                    typeProfile: 'true',
                    placeholder: 'Новый пароль',
                    name: 'password',
                    id: 'password',
                    onInput: (val: string) => {
                        this.data.new_password = val;
                    },
                }),
                repeatPassword: new InputField({
                    className: 'profile-content__row-text',
                    typeProfile: 'true',
                    placeholder: 'Повторите новый пароль',
                    name: 'password-repeat',
                    id: 'password-repeat',
                    onInput: (val: string) => {
                        this.data.repeat_password = val;
                    },
                }),
            });
        }
    }

    editProfile() {
        // this.profileMode = 'editProfile';
        this.initControls('onEditProfile');
        this.initComponents('onEditProfile');
    }
    editPassword() {
        // this.profileMode = 'editPassword';
        this.initTitles('onEditPassword');
        this.initControls('onEditPassword');
        this.initComponents('onEditPassword');
    }

    async requestChangeProfile() {
        console.log('requestChangeProfile method called');

        const { email, login, first_name, second_name, display_name, phone } =
            this.data;
        try {
            await profileController.editProfile({
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
            // console.log(this.props.profile);
        }
    }

    async requestChangePassword() {
        console.log('requestChangePassword method called');

        const { password, old_password, new_password, repeat_password } =
            this.data;
        try {
            await profileController.editPassword({
                password,
                old_password,
                new_password,
                repeat_password,
            });
            this.updateStoreAndRerender();
        } catch (error) {
            console.error(error);
        }
    }

    async requestLogout() {
        console.log('requestLogout method called');
        try {
            await userLoginController.logout();
        } catch (error) {
            console.error(error);
        }
    }

    updateStoreAndRerender() {
        // console.log('updateStoreAndRerender');

        store.dispatch({
            type: 'SET_PROFILE',
            profile: this.data,
        });

        // this.profileMode = 'default';
        this.initTitles();
        this.initControls();
        this.initComponents();
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

            this.profileTitleElem.setProps({ text: profile.display_name });
        }
        return true;
    }

    override render() {
        return `<div class="profile {{ className }}">
                    <div class="profile-header">
                        <div class="profile-header__image">
                            <img src="/images/default_profile.png"alt="Ваш аватар" class="profile-header__image-pic">
                        </div>
                        <span class="profile-header__title">
                            {{{profileTitle}}}
                        </span>
                    </div>
                    <div class="profile-content">
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
                            <div class="profile-content__row profile-content__row_content-spaced">
                            </div>              
                            <div class="profile-content__row profile-content__row_content-spaced">
                                {{{oldPasswordTitle}}}
                                {{{oldPassword}}}
                            </div>
                            <div class="profile-content__row profile-content__row_content-spaced">
                                {{{newPasswordTitle}}}
                                {{{newPassword}}}
                            </div>
                            <div class="profile-content__row profile-content__row_content-spaced">
                                {{{repeatPasswordTitle}}}
                                {{{repeatPassword}}}
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
                            </div>
                        </div>
                        <div class="profile-content__footer">
                            <div class="profile-content__row profile-content__row_content-align-center">
                                {{{saveChanges}}} 
                            </div>
                        </div>
                        
                    </div>
                </div>`;
    }
}

export default connect(Profile);

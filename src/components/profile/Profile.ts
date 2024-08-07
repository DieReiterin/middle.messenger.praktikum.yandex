import Block, { IProps } from '@/tools/Block';
import {
    Subtitle,
    InputField,
    InputFile,
    Link,
    Button,
    Image,
    PageTitle,
} from '@/components/index';
import './profile.scss';
import store from '@/tools/Store';
import connect from '@/tools/connect';
import ProfileController from '@/controllers/profile';
import UserLoginController from '@/controllers/user-login';

const profileController = new ProfileController();
const userLoginController = new UserLoginController();

class Profile extends Block {
    private alertElem: PageTitle = new PageTitle({
        className: 'profile__alert profile__alert_hidden',
        text: 'alertText',
    });

    private profileImageElem: Image = new Image({
        className: 'profile-header__image',
        type: 'default',
    });
    private profileTitleElem: Subtitle = new Subtitle({
        text: 'profile.title',
        className: 'profile__row-text subtitle_grey',
    });
    private avatarInputElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile__row-text subtitle_grey',
    });

    private emailElem: Subtitle = new Subtitle({
        text: 'profile.email',
        className: 'profile__row-text subtitle_grey',
    });
    private loginElem: Subtitle = new Subtitle({
        text: 'profile.login',
        className: 'profile__row-text subtitle_grey',
    });
    private firstNameElem: Subtitle = new Subtitle({
        text: 'profile.first_name',
        className: 'profile__row-text subtitle_grey',
    });
    private secondNameElem: Subtitle = new Subtitle({
        text: 'profile.second_name',
        className: 'profile__row-text subtitle_grey',
    });
    private displayNameElem: Subtitle = new Subtitle({
        text: 'profile.display_name',
        className: 'profile__row-text subtitle_grey',
    });
    private phoneElem: Subtitle = new Subtitle({
        text: 'profile.phone',
        className: 'profile__row-text subtitle_grey',
    });

    private oldPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile__row-text subtitle_grey',
    });
    private newPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile__row-text subtitle_grey',
    });
    private repeatPasswordElem: Subtitle = new Subtitle({
        text: '',
        className: 'profile__row-text subtitle_grey',
    });

    private data = {
        avatar: '',
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        old_password: '',
        new_password: '',
        repeat_password: '',
    };
    private avatarFile: File | null = null;
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
        this.initPage();
    }
    initPage() {
        this.getUserInfo();
        this.initTitles();
        this.initControls();
        this.initComponents();
    }
    initTitles(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                emailTitle: new Subtitle({
                    text: 'Почта',
                    className: 'profile__row-title subtitle_bold',
                }),
                loginTitle: new Subtitle({
                    text: 'Логин',
                    className: 'profile__row-title subtitle_bold',
                }),
                firstNameTitle: new Subtitle({
                    text: 'Имя',
                    className: 'profile__row-title subtitle_bold',
                }),
                secondNameTitle: new Subtitle({
                    text: 'Фамилия',
                    className: 'profile__row-title subtitle_bold',
                }),
                displayNameTitle: new Subtitle({
                    text: 'Имя в чате',
                    className: 'profile__row-title subtitle_bold',
                }),
                phoneTitle: new Subtitle({
                    text: 'Телефон',
                    className: 'profile__row-title subtitle_bold',
                }),
                oldPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile__row-title subtitle_bold',
                }),
                newPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile__row-title subtitle_bold',
                }),
                repeatPasswordTitle: new Subtitle({
                    text: '',
                    className: 'profile__row-title subtitle_bold',
                }),
            });
        } else if (type === 'onEditPassword') {
            this.setProps({
                oldPasswordTitle: new Subtitle({
                    text: 'Старый пароль',
                    className: 'profile__row-title subtitle_bold',
                }),
                newPasswordTitle: new Subtitle({
                    text: 'Новый пароль',
                    className: 'profile__row-title subtitle_bold',
                }),
                repeatPasswordTitle: new Subtitle({
                    text: 'Повторите новый пароль',
                    className: 'profile__row-title subtitle_bold',
                }),
            });
        }
    }
    initControls(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                avatarLink: new Link({
                    text: 'Поменять',
                    className: 'profile-content__link link_hidden',
                }),
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
        } else if (type === 'onEditAvatar') {
            this.setProps({
                avatarLink: new Link({
                    text: 'Поменять',
                    className: 'profile-content__link link_red',
                    onClick: () => this.requestChangeAvatar(),
                }),
            });
        }
    }
    initComponents(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
                alert: this.alertElem,

                profileImage: this.profileImageElem,
                profileTitle: this.profileTitleElem,
                avatarInput: this.avatarInputElem,

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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
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
                    className: 'profile__row-text',
                    typeProfile: 'true',
                    placeholder: 'Старый пароль',
                    name: 'old_password',
                    id: 'old_password',
                    onInput: (val: string) => {
                        this.data.old_password = val;
                    },
                }),
                newPassword: new InputField({
                    className: 'profile__row-text',
                    typeProfile: 'true',
                    placeholder: 'Новый пароль',
                    name: 'password',
                    id: 'password',
                    onInput: (val: string) => {
                        this.data.new_password = val;
                    },
                }),
                repeatPassword: new InputField({
                    className: 'profile__row-text',
                    typeProfile: 'true',
                    placeholder: 'Повторите новый пароль',
                    name: 'password-repeat',
                    id: 'password-repeat',
                    onInput: (val: string) => {
                        this.data.repeat_password = val;
                    },
                }),
            });
        } else if (type === 'onEditAvatar') {
            this.setProps({
                avatarInput: new InputFile({
                    className: 'profile__row-file',
                    name: 'avatar',
                    id: 'avatar',
                    accept: 'image/*',
                    onChange: (file: File) => {
                        this.avatarFile = file;
                        this.initControls('onEditAvatar');
                    },
                }),
            });
        }
    }

    showAlert(alertText: string) {
        if (!alertText) {
            return;
        }
        this.alertElem.setProps({
            className: 'profile__alert',
            text: alertText,
        });
        this.setProps({
            alert: this.alertElem,
        });
    }
    hideAlert() {
        this.alertElem.setProps({
            className: 'profile__alert profile__alert_hidden',
        });
        this.setProps({
            alert: this.alertElem,
        });
    }

    editProfile() {
        this.hideAlert();
        this.initControls('onEditProfile');
        this.initComponents('onEditProfile');
    }
    editPassword() {
        this.hideAlert();
        this.initTitles('onEditPassword');
        this.initControls('onEditPassword');
        this.initComponents('onEditPassword');
    }
    editAvatar() {
        this.hideAlert();
        this.initComponents('onEditAvatar');
    }

    async getUserInfo() {
        console.log('getUserInfo method called');
        try {
            await userLoginController.getInfo();
        } catch (error) {
            console.error('getUserInfo failed:', error);
        }
    }
    async loadUserAvatar(path: string | null) {
        if (path === null) {
            this.profileImageElem.setProps({
                onClick: () => this.editAvatar(),
            });
            return;
        }
        try {
            const result = await userLoginController.getStatic(path);
            this.profileImageElem.setProps({
                src: result,
                onClick: () => this.editAvatar(),
                type: '',
            });
        } catch (error) {
            this.showAlert('Не получилось загрузить ваш аватар');
        }
    }

    async requestChangeAvatar() {
        const avatar = this.avatarFile;
        if (!avatar) return;
        console.log('requestChangeAvatar method called');

        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            await profileController.editAvatar(formData);
            this.showAlert('Новый аватар сохранен');
            this.updateStoreAndRerender('afterSetAvatar');
        } catch (error) {
            this.showAlert('Не получилось сменить аватар');
        }
    }

    async requestChangeProfile() {
        console.log('requestChangeProfile method called');

        const { email, login, first_name, second_name, display_name, phone } =
            this.data;
        try {
            const response = await profileController.editProfile({
                email,
                login,
                first_name,
                second_name,
                display_name,
                phone,
            });

            if (typeof response === 'string') {
                this.showAlert(response);
            } else if (typeof response !== 'string' && 'reason' in response) {
                this.showAlert(response.reason);
            } else {
                this.showAlert('Данные сохранены');
                this.updateStoreAndRerender('afterSetProfile');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async requestChangePassword() {
        console.log('requestChangePassword method called');

        const { old_password, new_password, repeat_password } = this.data;
        try {
            const response = await profileController.editPassword({
                old_password,
                new_password,
                repeat_password,
            });

            if (response === 'OK') {
                this.updateStoreAndRerender('afterSetPassword');
                this.showAlert('Пароль изменен');
            } else if (typeof response === 'string' && response !== 'OK') {
                this.showAlert(response);
            } else if (typeof response !== 'string' && 'reason' in response) {
                this.showAlert(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async requestLogout() {
        console.log('requestLogout method called');
        try {
            await userLoginController.logout();
            window.router.go('/');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    updateStoreAndRerender(action: string = 'unset') {
        if (action === 'afterSetProfile') {
            store.dispatch({
                type: 'SET_PROFILE',
                profile: this.data,
            });
        } else if (action === 'afterSetAvatar') {
            this.getUserInfo();
        }
        this.initTitles();
        this.initControls();
        this.initComponents();
    }

    componentDidUpdate(): boolean {
        const { profile, user } = this.props;
        if (!(profile && user)) {
            return true;
        }
        if (profile.login.length === 0 || user.id.length === 0) {
            return true;
        }
        this.loadUserAvatar(user.avatar);
        this.data = profile;

        this.emailElem.setProps({ text: profile.email });
        this.loginElem.setProps({ text: profile.login });
        this.firstNameElem.setProps({ text: profile.first_name });
        this.secondNameElem.setProps({ text: profile.second_name });
        this.displayNameElem.setProps({ text: profile.display_name });
        this.phoneElem.setProps({ text: profile.phone });

        this.profileTitleElem.setProps({ text: profile.display_name });
        return true;
    }

    override render() {
        return `<div class="profile {{ className }}">
                    <div class="profile-header">
                        {{{profileImage}}}
                        {{{profileTitle}}}
                    </div>
                    <div class="profile-main">
                        <form class="profile__row profile__row_spaced profile__row_bordered">
                            {{{avatarInput}}}
                            {{{avatarLink}}}
                        </form>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{emailTitle}}}
                            {{{email}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{loginTitle}}}
                            {{{login}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{firstNameTitle}}}
                            {{{firstName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{secondNameTitle}}}
                            {{{secondName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{displayNameTitle}}}
                            {{{displayName}}}
                        </div>
                        <div class="profile__row profile__row_spaced profile__row_bordered">
                            {{{phoneTitle}}}
                            {{{phone}}}
                        </div>              
                        <div class="profile__row profile__row_spaced">
                            {{{oldPasswordTitle}}}
                            {{{oldPassword}}}
                        </div>
                        <div class="profile__row profile__row_spaced">
                            {{{newPasswordTitle}}}
                            {{{newPassword}}}
                        </div>
                        <div class="profile__row profile__row_spaced">
                            {{{repeatPasswordTitle}}}
                            {{{repeatPassword}}}
                        </div>
                        {{{alert}}}
                    </div>
                    <div class="profile-footer">
                        <div class="profile__row profile__row_align-left profile__row_bordered">
                            {{{editData}}}
                        </div>
                        <div class="profile__row profile__row_align-left profile__row_bordered">
                            {{{editPassword}}}
                        </div>
                        <div class="profile__row profile__row_align-left">
                            {{{signout}}}
                        </div>
                    </div>
                    <div class="profile-footer">
                        <div class="profile__row profile__row_align-center">
                            {{{saveChanges}}} 
                        </div>
                    </div>                
                </div>`;
    }
}

export default connect(Profile);

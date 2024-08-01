import Block, { IProps } from '@/tools/Block';
import {
    Subtitle,
    InputField,
    InputFile,
    Link,
    Button,
    Image,
} from '@/components/index';
import './profile.scss';
import store from '@/tools/Store';
import connect from '@/tools/connect';
import ProfileController from '@/controllers/profile';
import UserLoginController from '@/controllers/user-login';

const profileController = new ProfileController();
const userLoginController = new UserLoginController();

class Profile extends Block {
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
    // private avatarURL: string | null = null;
    constructor(props: IProps = {}) {
        super({
            ...props,
        });
        this.initPage();
    }
    initPage() {
        this.getUserInfo();
        console.log('this.props', this.props);

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
                    // className: 'profile-header__title profile-content__link',
                    className: 'profile-content__link link_red',
                    onClick: () => this.requestChangeAvatar(),
                }),
            });
        }
    }
    initComponents(type: string = 'default') {
        if (type === 'default') {
            this.setProps({
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
                    // accept: 'image/png, image/jpeg',
                    onChange: (file: File) => {
                        this.avatarFile = file;
                        // this.data.avatar = '/' + file.name;
                        this.initControls('onEditAvatar');
                    },
                }),
            });
        }
    }

    editProfile() {
        this.initControls('onEditProfile');
        this.initComponents('onEditProfile');
    }
    editPassword() {
        this.initTitles('onEditPassword');
        this.initControls('onEditPassword');
        this.initComponents('onEditPassword');
    }
    editAvatar() {
        this.initComponents('onEditAvatar');
    }

    async getUserInfo() {
        console.log('getUserInfo method called');
        try {
            await userLoginController.getInfo();
            // console.log(this.props);

            // this.updateStoreAndRerender();
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
        // console.log('loadUserAvatar method called');
        try {
            const result = await userLoginController.getStatic(path);
            // console.log('loadUserAvatar result', result);
            // return result;
            this.profileImageElem.setProps({
                src: result,
                onClick: () => this.editAvatar(),
                type: '',
            });
            // store.dispatch({
            //     type: 'SET_AVATAR',
            //     avatar: '/' + path,
            // });
        } catch (error) {
            console.error('loadUserAvatar failed:', error);
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
            this.updateStoreAndRerender('afterSetAvatar');
        } catch (error) {
            console.error(error);
        }
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
            this.updateStoreAndRerender('afterSetProfile');
        } catch (error) {
            console.error(error);
        } finally {
            // console.log(this.props.profile);
        }
    }

    async requestChangePassword() {
        console.log('requestChangePassword method called');

        const { old_password, new_password, repeat_password } = this.data;
        try {
            await profileController.editPassword({
                old_password,
                new_password,
                repeat_password,
            });
            this.updateStoreAndRerender('afterSetPassword');
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
        // console.log('updateStoreAndRerender');
        if (action === 'afterSetProfile') {
            store.dispatch({
                type: 'SET_PROFILE',
                profile: this.data,
            });
        } else if (action === 'afterSetAvatar') {
            this.getUserInfo();
            // this.loadUserAvatar(this.props.user.avatar);
            // store.dispatch({
            //     type: 'SET_AVATAR',
            //     avatar: this.data.avatar,
            // });
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
        // <div class="profile-header__image">
        //                     <img src="/images/default_profile.png" alt="Ваш аватар" class="profile-header__image-pic">
        //                 </div>
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
// const withProfile = connect((state) => ({
//     profile: { ...state.profile },
// }));

// export default withProfile(Profile);

export default connect(Profile);

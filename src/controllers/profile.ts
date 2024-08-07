import ProfileApi from '@/api/profile-api';
import EditPasswordApi from '@/api/edit-password-api';
import EditAvatarApi from '@/api/edit-avatar-api';
import validate from '@/tools/validate';

interface IProfileFormModel {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

interface IPasswordFormModel {
    old_password: string;
    new_password: string;
    repeat_password: string;
}

const profileApi = new ProfileApi();
const editPasswordApi = new EditPasswordApi();
const editAvatarApi = new EditAvatarApi();

export default class ProfileController {
    public async editProfile(requestData: IProfileFormModel) {
        try {
            // console.log('UserLoginController called');

            const validateEmail = validate('email', requestData.email);
            const validateLogin = validate('login', requestData.login);
            const validateFirstName = validate(
                'first_name',
                requestData.first_name,
            );
            const validateSecondName = validate(
                'second_name',
                requestData.second_name,
            );
            const validateDisplayName = validate(
                'display_name',
                requestData.display_name,
            );
            const validatePhone = validate('phone', requestData.phone);

            const statuses = [
                validateEmail,
                validateLogin,
                validateFirstName,
                validateSecondName,
                validateDisplayName,
                validatePhone,
            ];

            if (!statuses.every((status) => status === 'ok')) {
                return 'Поля не прошли валидацию';
            } else {
                const response = await profileApi.request(requestData);
                console.log('response', response);

                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    public async editPassword(data: IPasswordFormModel) {
        try {
            const validateNewPassword = validate('password', data.new_password);

            // if (data.old_password !== data.password) {
            //     console.log('incorrect current password');
            //     throw new Error('editPassword validation failed');
            // }
            if (validateNewPassword !== 'ok') {
                console.log('new password validation: ' + validateNewPassword);
                return 'Ошибка в новом пароле: ' + validateNewPassword;
            }
            if (data.old_password === data.new_password) {
                // console.log('new password cannot be equal to current one');
                return 'Новый пароль должен отличаться от старого';
            }
            if (data.repeat_password !== data.new_password) {
                console.log('incorrect repeat password');
                return 'Повторите пароль корректно';
            }

            const preppedData = {
                oldPassword: data.old_password,
                newPassword: data.new_password,
            };
            // console.log('requestData');
            // console.log(preppedData);
            const response = await editPasswordApi.request(preppedData);
            // console.log('response');
            // console.log(response);

            return response;

            // if (response !== 'OK') {
            //     const responseData = JSON.parse(response);
            //     if ('reason' in responseData) {
            //         // console.log('Server error reason: ' + responseData.reason);
            //         throw new Error('editPassword Server error');
            //     }
            //     // console.log('parsedResponse');
            //     // console.log(responseData);
            // }
        } catch (error) {
            throw error;
        }
    }

    public async editAvatar(data: FormData) {
        try {
            // console.log('requestData');
            // console.log(data);
            const response = await editAvatarApi.request(data);
            // console.log('response');
            // console.log(response);

            return response;

            // if (response !== 'OK') {
            //     const responseData = JSON.parse(response);
            //     if ('reason' in responseData) {
            //         // console.log('Server error reason: ' + responseData.reason);
            //         throw new Error('editPassword Server error');
            //     }
            //     // console.log('parsedResponse');
            //     // console.log(responseData);
            // }
        } catch (error) {
            throw error;
        }
    }
}

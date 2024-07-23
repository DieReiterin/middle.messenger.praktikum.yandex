import ProfileAPI from '@/api/profile-api';
import validate from '@/tools/validate';

interface IProfileFormModel {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
}

const profileAPI = new ProfileAPI();

export default class ProfileController {
    public async changeProfile(data: IProfileFormModel) {
        try {
            // console.log('UserLoginController called');

            const validateEmail = validate('email', data.email);
            const validateLogin = validate('login', data.login);
            const validateFirstName = validate('first_name', data.first_name);
            const validateSecondName = validate(
                'second_name',
                data.second_name,
            );
            const validateDisplayName = validate(
                'display_name',
                data.display_name,
            );
            const validatePhone = validate('phone', data.phone);

            const statuses = [
                validateEmail,
                validateLogin,
                validateFirstName,
                validateSecondName,
                validateDisplayName,
                validatePhone,
            ];

            if (!statuses.every((status) => status === 'ok')) {
                console.log('email validation: ' + validateEmail);
                console.log('login validation: ' + validateLogin);
                console.log('first_name validation: ' + validateFirstName);
                console.log('second_name validation: ' + validateSecondName);
                console.log('display_name validation: ' + validateDisplayName);
                console.log('phone validation: ' + validatePhone);
                // return;
                throw new Error('changeProfile validation failed');
            }
            const response = await profileAPI.request(data);

            if (typeof response === 'object' && 'reason' in response) {
                console.log('Server error reason: ' + response.reason);
                // return;
                throw new Error('changeProfile Server error');
            }
            console.log('response: ', response);
        } catch (error) {
            console.log('Profile controller failed:', error);
        }
    }
}

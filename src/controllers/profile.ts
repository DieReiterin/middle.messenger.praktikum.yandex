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
    public async changeProfile(requestData: IProfileFormModel) {
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
                console.log('email validation: ' + validateEmail);
                console.log('login validation: ' + validateLogin);
                console.log('first_name validation: ' + validateFirstName);
                console.log('second_name validation: ' + validateSecondName);
                console.log('display_name validation: ' + validateDisplayName);
                console.log('phone validation: ' + validatePhone);
                return;
                // throw new Error('changeProfile validation failed');
            }
            const response = await profileAPI.request(requestData);

            const responseData = JSON.parse(response);

            // console.log(responseData);

            // if (typeof response === 'string') {
            //     console.log('string response');
            //     console.log(response);
            // }

            // if (typeof response === 'object') {
            //     console.log('object response');
            //     console.log(response);
            // }

            if ('reason' in responseData) {
                console.log('Server error reason: ' + responseData.reason);
                // return;
                throw new Error('changeProfile Server error');
            }
            // return response;
        } catch (error) {
            // console.log('Profile controller failed:', error);
            throw error;
        }
    }
}

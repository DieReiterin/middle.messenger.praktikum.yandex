import SignupApi from '@/api/signup-api';
import validate from '@/tools/validate';

interface SignupFormModel {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

const signupApi = new SignupApi();

export default class UserSignupController {
    public async signup(data: SignupFormModel) {
        try {
            // console.log('UserSignupController called');

            const validateEmail = validate('email', data.email);
            const validateLogin = validate('login', data.login);
            const validateFirstName = validate('first_name', data.first_name);
            const validateSecondName = validate(
                'second_name',
                data.second_name,
            );
            const validatePhone = validate('phone', data.phone);
            const validatePassword = validate('password', data.password);

            const statuses = [
                validateEmail,
                validateLogin,
                validateFirstName,
                validateSecondName,
                validatePhone,
                validatePassword,
            ];

            if (!statuses.every((status) => status === 'ok')) {
                return 'Поля не прошли валидацию';
            }

            const response = await signupApi.request(data);

            return response;
        } catch (error) {
            throw error;
        }
    }
}

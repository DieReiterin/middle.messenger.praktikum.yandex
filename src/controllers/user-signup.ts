import SignupAPI from '@/api/signup-api';
import validate from '@/tools/validate';

interface SignupFormModel {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

const signupAPI = new SignupAPI();
// const userLoginValidator = validateLoginFields(validateRules);

export default class UserSignupController {
    public async signup(data: SignupFormModel) {
        try {
            // Запускаем крутилку
            // console.log('Loading...');
            console.log('UserSignupController called');

            const validateEmail = validate('email', data.email);
            const validateLogin = validate('login', data.login);
            const validateFirstName = validate('first_name', data.first_name);
            const validateSecondName = validate(
                'second_name',
                data.second_name,
            );
            const validatePhone = validate('phone', data.phone);
            const validatePassword = validate('password', data.password);

            if (
                validateEmail !== 'ok' ||
                validateLogin !== 'ok' ||
                validateFirstName !== 'ok' ||
                validateSecondName !== 'ok' ||
                validatePhone !== 'ok' ||
                validatePassword !== 'ok'
            ) {
                console.log('email validation: ' + validateEmail);
                console.log('login validation: ' + validateLogin);
                console.log('first_name validation: ' + validateFirstName);
                console.log('second_name validation: ' + validateSecondName);
                console.log('phone validation: ' + validatePhone);
                console.log('password validation: ' + validatePassword);
                return;
            }

            // const response = loginApi.request(prepareDataToRequest(data));
            const response = await signupAPI.request(data);

            if (response.reason) {
                console.log('Server error reason: ' + response.reason);
                return;
            }
            console.log('response: ', response);

            window.router.go('/messenger');

            console.log('Loading complete');

            // RouteManagement.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            console.log('Controller Login failed:', error);
        }
    }
}

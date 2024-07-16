import LoginAPI from '@/api/login-api';
import validate from '@/tools/validate';

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginAPI();
// const userLoginValidator = validateLoginFields(validateRules);

export default class UserLoginController {
    public async login(data: LoginFormModel) {
        try {
            // Запускаем крутилку
            // console.log('Loading...');
            console.log('UserLoginController called');

            const validateLogin = validate('login', data.login);
            const validatePassword = validate('password', data.password);

            if (validateLogin !== 'ok' || validatePassword !== 'ok') {
                console.log('login validation: ' + validateLogin);
                console.log('password validation: ' + validatePassword);
                return;
            }

            // const response = loginApi.request(prepareDataToRequest(data));
            const response = await loginApi.request(data);

            if (!response.user_id) {
                console.log('Server error reason: ' + response.reason);
                return;
            }
            console.log('User ID: ', response.user_id);

            window.router.go('/messenger');

            console.log('Loading complete');

            // RouteManagement.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            console.log('Controller Login failed:', error);
        }
    }
}

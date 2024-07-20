import LoginAPI from '@/api/login-api';
import GetUserInfoAPI from '@/api/get-user-info-api';
import validate from '@/tools/validate';

interface LoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginAPI();
const getUserInfoAPI = new GetUserInfoAPI();
// const userLoginValidator = validateLoginFields(validateRules);

export default class UserLoginController {
    public async login(data: LoginFormModel) {
        try {
            // Запускаем крутилку
            // console.log('Loading...');
            // console.log('UserLoginController called');

            const validateLogin = validate('login', data.login);
            const validatePassword = validate('password', data.password);

            if (validateLogin !== 'ok' || validatePassword !== 'ok') {
                console.log('login validation: ' + validateLogin);
                console.log('password validation: ' + validatePassword);
                return;
            }

            // const response = loginApi.request(prepareDataToRequest(data));
            const response = await loginApi.request(data);

            if (typeof response === 'object' && 'reason' in response) {
                console.log('Server error reason: ' + response.reason);
                return;
            }
            console.log('response: ', response);

            window.router.go('/messenger');
        } catch (error) {
            console.log('Controller Login failed:', error);
        }
    }

    public async getInfo() {
        try {
            // console.log('UserLoginController called');
            const response = await getUserInfoAPI.request();

            if (typeof response === 'object' && 'reason' in response) {
                console.log('Server error reason: ' + response.reason);
                return;
            }
            console.log('response: ', response);
        } catch (error) {
            console.log('Controller Login failed:', error);
        }
    }
}

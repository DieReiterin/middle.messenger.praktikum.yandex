import LoginApi from '@/api/login-api';
import LogoutAPI from '@/api/logout-api';
import GetUserInfoApi from '@/api/get-user-info-api';
import validate from '@/tools/validate';

interface ILoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginApi();
const logoutAPI = new LogoutAPI();
const getUserInfoApi = new GetUserInfoApi();

export default class UserLoginController {
    public async login(data: ILoginFormModel) {
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

    public async logout() {
        try {
            const response = await logoutAPI.request();

            console.log('response');
            console.log(response);

            if (response !== 'OK') {
                throw new Error(response);
            }
            window.router.go('/');
        } catch (error) {
            throw error;
        }
    }

    public async getInfo() {
        try {
            // console.log('UserLoginController called');
            const response = await getUserInfoApi.request();

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

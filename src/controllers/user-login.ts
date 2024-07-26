import LoginApi from '@/api/login-api';
import LogoutAPI from '@/api/logout-api';
import GetUserInfoApi from '@/api/get-user-info-api';
import validate from '@/tools/validate';
import store from '@/tools/Store';

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
                throw new Error('editPassword validation failed');
            }

            const response = await loginApi.request(data);
            console.log('response: ', response);

            if (response !== 'OK') {
                throw new Error('server login failed');
            }
        } catch (error) {
            throw error;
        }
    }

    public async logout() {
        try {
            const response = await logoutAPI.request();
            console.log('response: ', response);

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
            const response = await getUserInfoApi.request();
            const parsedResponse = JSON.parse(response);
            // console.log('parsedResponse: ', parsedResponse);

            if (!('id' in parsedResponse)) {
                throw new Error('server getInfo failed');
            } else {
                store.dispatch({
                    type: 'SET_USER_DATA',
                    data: parsedResponse,
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

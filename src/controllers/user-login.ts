import LoginApi from '@/api/login-api';
import LogoutApi from '@/api/logout-api';
import GetUserInfoApi from '@/api/get-user-info-api';
import GetStaticApi from '@/api/get-static-api';
import validate from '@/tools/validate';
import store from '@/tools/Store';

interface ILoginFormModel {
    login: string;
    password: string;
}

const loginApi = new LoginApi();
const logoutApi = new LogoutApi();
const getUserInfoApi = new GetUserInfoApi();
const getStaticApi = new GetStaticApi();

export default class UserLoginController {
    public async login(data: ILoginFormModel) {
        try {
            // Запускаем крутилку
            // console.log('Loading...');
            // console.log('UserLoginController called');

            const validateLogin = validate('login', data.login);
            const validatePassword = validate('password', data.password);

            if (validateLogin !== 'ok' || validatePassword !== 'ok') {
                return 'Поля не прошли валидацию';
            }

            const response = await loginApi.request(data);

            return response;
            // console.log('response: ', response);

            // if (response !== 'OK' && typeof response !== 'string') {
            //     throw new Error(response.reason);
            // }
        } catch (error) {
            throw error;
        }
    }

    public async logout() {
        try {
            const response = await logoutApi.request();
            // console.log('response: ', response);

            if (response !== 'OK') {
                throw new Error(response);
            }
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

    public async getStatic(path: string) {
        try {
            const response = await getStaticApi.request(path);

            if (typeof response !== 'object' || !(response instanceof Blob)) {
                throw new Error('server getStatic failed');
            }

            const fileURL = URL.createObjectURL(response);
            // console.log('File URL:', fileURL);

            return fileURL;

            // store.dispatch({
            //     type: 'SET_USER_DATA',
            //     data: parsedResponse,
            // });
        } catch (error) {
            throw error;
        }
    }
}

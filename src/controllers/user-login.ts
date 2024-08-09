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
            const validateLogin = validate('login', data.login);
            const validatePassword = validate('password', data.password);

            if (validateLogin !== 'ok' || validatePassword !== 'ok') {
                return 'Поля не прошли валидацию';
            }

            const response = await loginApi.request(data);

            if (response === 'OK') {
                localStorage.setItem('isAuth', 'true');
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    public async logout() {
        try {
            const response = await logoutApi.request();
            console.log('logout response', response);

            if (response === 'OK') {
                localStorage.removeItem('isAuth');
            } else {
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
            return fileURL;
        } catch (error) {
            throw error;
        }
    }
}

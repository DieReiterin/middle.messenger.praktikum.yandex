import LoginAPI from '@/api/login-api';

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

            // const validateData = userLoginValidator(data);

            // if (!validateData.isCorrect) {
            //     throw new Error(validateData);
            // }

            // const response = loginApi.request(prepareDataToRequest(data));
            const response = await loginApi.request(data);
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

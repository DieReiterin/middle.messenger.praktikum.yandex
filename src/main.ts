import './style.scss';
import '../global.d.ts';

import Router from '@/tools/Router';
import {
    LoginPage,
    SignupPage,
    ChatPage,
    ProfilePage,
    ErrorPage,
} from '@/pages/index';

const router = new Router('#app');

router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage)
    .use('/error', ErrorPage)
    .start();

window.router = router;

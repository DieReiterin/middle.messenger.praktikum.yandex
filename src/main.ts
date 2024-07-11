import './style.scss';
import Router from '@/tools/Router';
import {
    LoginPage,
    SignupPage,
    ChatPage,
    ProfilePage,
    ErrorPage,
} from '@/pages/index';
import '../global.d.ts';

const router = new Router('#app');

router
    .use('/', LoginPage)
    .use('/sign-up', SignupPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage)
    .use('/error', ErrorPage)
    .start();

window.router = router;

// import navigate from '@/tools/navigate';
// navigate('layout', 'navigated');
// navigate('page', 'login');

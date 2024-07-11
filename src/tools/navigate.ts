import { LayoutNavigated, LayoutDefault } from '@/layouts/index';
import {
    LoginPage,
    SignupPage,
    ChatPage,
    ProfilePage,
    ErrorPage,
} from '@/pages/index';

function setLayout(type: string) {
    let layout;
    if (type === 'navigated') {
        layout = new LayoutNavigated();
    } else if (type === 'default') {
        layout = new LayoutDefault();
    } else {
        throw new Error(`no such layout - ${type}`);
    }
    const container = document.getElementById('app')!;
    container.append(layout.getContent()!);
}
function setPage(type: string) {
    let page;
    if (type === 'login') {
        page = new LoginPage();
    } else if (type === 'signup') {
        page = new SignupPage();
    } else if (type === 'chats') {
        page = new ChatPage();
    } else if (type === 'profile') {
        page = new ProfilePage({ profileType: 'default' });
    } else if (type === 'settings') {
        page = new ProfilePage({ profileType: 'settings' });
    } else if (type === 'not-found') {
        page = new ErrorPage({ title: '400', subtitle: 'Не туда попали' });
    } else if (type === 'server-error') {
        page = new ErrorPage({ title: '500', subtitle: 'Мы уже фиксим' });
    } else {
        throw new Error(`no such page - ${type}`);
    }
    const content: HTMLElement | null =
        document.getElementById('layout-content');
    if (content) {
        content.innerHTML = '';
        content.append(page.getContent()!);
    }
}

export default function navigate(pageOrLayout: string, type: string) {
    if (pageOrLayout === 'layout') {
        setLayout(type);
    } else if (pageOrLayout === 'page') {
        setPage(type);
    } else {
        throw new Error(
            `incorrect navigation params - ${pageOrLayout} and ${type}`,
        );
    }
}

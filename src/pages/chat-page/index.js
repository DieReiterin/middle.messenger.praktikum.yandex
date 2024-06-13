import Handlebars from 'handlebars'
import './chat-page.scss'
export { default as ChatPage } from './chat-page.hbs?raw'

Handlebars.registerHelper('chat-page-list', () => {
    return [
        { name: 'Егор', message: 'Изображение', unread: '2', avatar: '../static/icons/favicon.png' },
        { name: 'Матвей', message: 'стикер' },
        { name: 'Алена', message: 'Друзья, у меня для вас особенный выпуск новостей!', unread: '1' },
    ]
});
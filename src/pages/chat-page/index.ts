import "./chat-page.scss";
export { default as ChatPage } from "./chat-page.hbs?raw";
import Handlebars from "handlebars";
import favicon from "/icons/favicon.png";

Handlebars.registerHelper("chat-page-list", () => {
    return [
        { name: "Егор", message: "Изображение", unread: "2", avatar: favicon },
        { name: "Матвей", message: "стикер" },
        {
            name: "Алена",
            message: "Друзья, у меня для вас особенный выпуск новостей!",
            unread: "1",
        },
    ];
});

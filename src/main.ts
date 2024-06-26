import "./style.scss";
import Handlebars from "handlebars";
import Block from "./tools/Block.ts";

import "./components/button/button.scss";
import "./components/link/link.scss";
import "./components/page-title/page-title.scss";
import "./components/input-field/input-field.scss";
import "./components/server-alert/server-alert.scss";
import "./components/footer/footer.scss";

import "./pages/login-page/login-page.scss";
import "./pages/not-found-page/not-found-page.scss";
import "./layouts/layout-navigated/layout-navigated.scss";

class Button extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: () => console.log("event"),
            },
            attr: {
                class: `button`,
            },
        });
    }
    render() {
        return `<button class="{{className}}" type="{{type}}" page="{{page}}">{{text}}</button>`;
    }
}
class Link extends Block {
    constructor(props?) {
        super({
            ...props,
            events: {
                click: () => console.log("link-event"),
            },
            attr: {
                class: `link`,
            },
        });
    }
    render() {
        return `<a
                    href="{{href}}"
                    class="{{className}}"
                    page="{{page}}"
                    action="{{action}}"
                >{{text}}</a>`;
    }
}
class PageTitle extends Block {
    constructor(props?) {
        super({
            ...props,
            attr: {
                class: `page-title`,
            },
        });
    }
    render() {
        return `<h1 class="page-title {{className}}">
                    {{text}}
                </h1>`;
    }
}
class InputField extends Block {
    constructor(props?) {
        super({
            ...props,
            attr: {
                class: `input-field`,
            },
        });
    }
    render() {
        return `<div class="{{className}} {{#if typeProfile}}input-field_type-profile{{/if}}">
                    {{#if label}}
                        <label class="input-field__label" for="{{id}}">
                            {{label}}
                        </label>
                    {{/if}}
                    <input
                        name="{{name}}"
                        class="input-field__control"
                        type="text"
                        id="{{id}}"
                        placeholder="{{placeholder}}"
                        value="{{value}}"
                    />
                    <label class="input-field__error" for="{{id}}">
                        {{error}}
                    </label>
                </div>
                `;
    }
}

class ServerAlert extends Block {
    constructor(props?, children?) {
        super({
            ...props,
            attr: {
                class: `server-alert`,
            },
            content: children.content,
        });
    }
    render() {
        return `{{#> ServerAlert }}
                    {{{content}}}
                {{/ ServerAlert }}`;
        // return `<div class="server-alert {{ className }}">
        //             {{{content}}}
        //         </div>`;
    }
}
class Footer extends Block {
    constructor(props?) {
        super({
            ...props,
            btn1: new Button({
                className: "footer__btn",
                page: "login",
                text: "Авторизация",
            }),
            btn2: new Button({
                className: "footer__btn",
                page: "signin",
                text: "Регистрация",
            }),
            btn3: new Button({
                className: "footer__btn",
                page: "chat",
                text: "Список чатов",
            }),
            btn4: new Button({
                className: "footer__btn",
                page: "profile",
                text: "Профиль",
            }),
            btn5: new Button({
                className: "footer__btn",
                page: "settings",
                text: "Настройки",
            }),
            btn6: new Button({
                className: "footer__btn",
                page: "not-found",
                text: "Страница 404",
            }),
            btn7: new Button({
                className: "footer__btn",
                page: "server-error",
                text: "Страница 5**",
            }),
        });
    }
    render() {
        return `<nav class="footer {{ className }}">
                    <div class="footer__content">
                        {{{btn1}}} 
                        {{{btn2}}} 
                        {{{btn3}}} 
                        {{{btn4}}} 
                        {{{btn5}}} 
                        {{{btn6}}} 
                        {{{btn7}}} 
                    </div>
                </nav>`;
    }
}
class NotFoundPage extends Block {
    constructor(props?) {
        super({
            ...props,
            alert: new ServerAlert({
                content: {
                    title1: new PageTitle({
                        className: "server-alert__title",
                        text: "400",
                    }),
                    title2: new PageTitle({
                        className: "server-alert__subtitle",
                        text: "Не туда попали",
                    }),
                    link: new Link({
                        className: "server-alert__link",
                        page: "chat",
                        text: "Назад к чатам",
                    }),
                },
            }),
        });
    }
    override render() {
        return `<div class="not-found-page">
                    {{{alert}}}
                </div>`;
    }
}

class LoginPage extends Block {
    constructor(props?) {
        super({
            ...props,
            title: new PageTitle({
                className: "login-page__title",
                text: "Вход",
            }),
            input1: new InputField({
                className: "login-page__input",
                label: "Логин",
                placeholder: "введите логин",
                error: "",
                name: "login",
                id: "login",
            }),
            input2: new InputField({
                className: "login-page__input",
                label: "Пароль",
                placeholder: "введите пароль",
                error: "Неверный пароль",
                name: "password",
                id: "password",
            }),
            btn: new Button({
                className: "login-page__submit-btn",
                text: "Войти",
                page: "chat",
            }),
            link: new Link({
                className: "login-page__link",
                text: "Регистрация",
                page: "signin",
            }),
        });
    }
    override render() {
        return `<form class="login-page">
                    <div class="login-page__main">
                        {{{title}}} 
                        {{{input1}}}  
                        {{{input2}}}                          
                    </div>
                    <div class="login-page__footer">
                        {{{btn}}}    
                        {{{link}}}           
                    </div>
                </form>`;
    }
}

class LayoutNavigated extends Block {
    constructor(props?) {
        super({
            ...props,
            footer: new Footer({
                className: "layout-navigated__footer",
            }),
        });
    }
    override render() {
        return `<main class="layout-navigated">
                    <div class="layout-navigated__content" id="layout-content">
                    </div>

                    {{{footer}}}
                </main>`;
    }
}
function setLayout(type) {
    const container = document.getElementById("app")!;
    container.append(type.getContent()!);
}
function navigate(page) {
    const content = document.getElementById("layout-content");
    content.append(page.getContent()!);
}
const onLoadLayout = new LayoutNavigated();
// const onLoadPage = new LoginPage();
const notfound = new NotFoundPage();
setLayout(onLoadLayout);
navigate(notfound);

// class Input extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             events: {
//                 change: (e: Event) =>
//                     props.onChange((e.target as HTMLInputElement).value),
//                 blur: () => this.validate(),
//             },
//         });
//     }
//     render() {
//         return `<input />`;
//     }
//     validate() {
//         console.log("Here we call validation code on blur");
//     }
// }

// class PageWithButton extends Block {
//     constructor(props) {
//         super({
//             ...props, //{buttonText: 'Button'}
//             button: new Button({
//                 text: props.buttonText,
//             }),
//             input: new Input({
//                 label: "input",
//                 onChange: (value) => {
//                     this.setProps({ buttonText: value });
//                 },
//             }),
//         });
//     }
//     componentDidUpdate(oldProps, newProps) {
//         if (oldProps.buttonText !== newProps.buttonText) {
//             this.children.button.setProps({ text: newProps.buttonText });
//         }
//         return true;
//     }
//     override render() {
//         return "<div>{{{ button }}} {{{ input }}}</div>";
//     }
// }

// const block = new PageWithButton({ buttonText: "Войти" });
// //const block = new PageWithList();
// const container = document.getElementById("app")!;
// container.append(block.getContent()!);

// class ChatItem extends Block {
//     constructor({ ...props }) {
//         super({
//             ...props,
//         });
//     }

//     render() {
//         return `
//       <div>
//         <div>{{ name }}</div>
//         <div>{{ message }}</div>
//       </div>`;
//     }
// }
// class PageWithList extends Block {
//     constructor(props) {
//         super({
//             ...props, //{buttonText: 'Button'}
//             lists: [
//                 new ChatItem({ name: "Samanta Smith", message: "Алло, на!" }),
//                 new ChatItem({ name: "John Dow 1", message: "What?" }),
//                 new ChatItem({ name: "John Dow 2", message: "What?" }),
//                 new ChatItem({ name: "John Dow 3", message: "What?" }),
//                 new ChatItem({ name: "John Dow 4", message: "What?" }),
//                 new ChatItem({ name: "John Dow 5", message: "What?" }),
//                 new ChatItem({ name: "John Dow 6", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "Samanta Smith", message: "Алло, на!" }),
//                 new ChatItem({ name: "John Dow 1", message: "What?" }),
//                 new ChatItem({ name: "John Dow 2", message: "What?" }),
//                 new ChatItem({ name: "John Dow 3", message: "What?" }),
//                 new ChatItem({ name: "John Dow 4", message: "What?" }),
//                 new ChatItem({ name: "John Dow 5", message: "What?" }),
//                 new ChatItem({ name: "John Dow 6", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//                 new ChatItem({ name: "John Dow", message: "What?" }),
//             ],
//         });
//     }

//     override render() {
//         return "<div>{{{ lists }}}</div>";
//     }
// }

// import Handlebars from "handlebars";
// import * as Components from "./components";
// import * as Pages from "./pages";
// import * as Layouts from "./layouts";
// import "./style.scss";

// const layouts = {
//     default: [Layouts.LayoutDefault],
//     navigated: [Layouts.LayoutNavigated],
// };

// const pages = {
//     chat: [Pages.ChatPage],
//     login: [Pages.LoginPage],
//     "not-found": [Pages.NotFoundPage],
//     profile: [Pages.ProfilePage],
//     "server-error": [Pages.ServerErrorPage],
//     settings: [Pages.SettingsPage],
//     signin: [Pages.SigninPage],
// };

// Object.entries(Components).forEach(([name, component]) => {
//     Handlebars.registerPartial(name, component);
// });

// function setLayout(type) {
//     const [source, args] = layouts[type];
//     const handlebarsFunc = Handlebars.compile(source);
//     document.body.innerHTML = handlebarsFunc(args);
// }

// function navigate(page) {
//     const [source, args] = pages[page];
//     const handlebarsFunc = Handlebars.compile(source);

//     const content = document.getElementById("layout-content");
//     content.innerHTML = handlebarsFunc(args);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     setLayout("navigated");
//     navigate("settings");
// });

// document.addEventListener("click", (e) => {
//     const page = e.target.getAttribute("page");

//     if (page) {
//         navigate(page);

//         e.preventDefault();
//         e.stopImmediatePropagation;
//     }
// });

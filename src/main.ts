// import Handlebars from "handlebars";
// import Block from "./tools/Block.ts";
import "./style.scss";
// import LoginPage from "./pages/login-page/LoginPage.ts";
// import SigninPage from "./pages/signin-page/SigninPage.ts";
// import ChatPage from "./pages/chat-page/ChatPage.ts";
// import ProfilePage from "./pages/profile-page/ProfilePage.ts";
// import NotFoundPage from "./pages/not-found-page/NotFoundPage.ts";
// import LayoutNavigated from "./layouts/layout-navigated/LayoutNavigated.ts";

// import "./components/server-alert/server-alert.scss";
// import "./pages/not-found-page/not-found-page.scss";
import navigate from "./tools/navigate.ts";

// function setLayout(type) {
//     const container = document.getElementById("app")!;
//     container.append(type.getContent()!);
// }
// function navigate(page) {
//     const content = document.getElementById("layout-content");
//     content.innerHTML = "";
//     content.append(page.getContent()!);
// }
// const onLoadLayout = new LayoutNavigated();
// const login = new LoginPage();
// const signin = new SigninPage();
// const notfound = new NotFoundPage();
// const chat = new ChatPage();
// const profile = new ProfilePage();
// const notFound = new NotFoundPage();
// setLayout(onLoadLayout);
// navigate(profile);
navigate("layout", "navigated");
navigate("page", "profile");

document.querySelectorAll(`[page]`).forEach((el) => {
    const route = el.getAttribute("page");
    if (!route) return;

    el.addEventListener("click", () => {
        navigate("page", route);
    });
});

// class Input extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             events: {
// change: (e: Event) =>
//     props.onChange((e.target as HTMLInputElement).value),
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
// onChange: (value) => {
//     this.setProps({ buttonText: value });
// },
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

// import Handlebars from "handlebars";
// import Block from "./tools/Block.ts";
import "./style.scss";
import navigate from "./tools/navigate.ts";

navigate("layout", "navigated");
navigate("page", "login");

document.querySelectorAll(`[page]`).forEach((el) => {
    const route = el.getAttribute("page");

    el.addEventListener("click", () => {
        if (!route) return;
        if (route === "chat") console.log("CHAT ERROR PATH");
        console.log("route - " + route);
        navigate("page", route);
    });
});

// class Input extends Block {
//     constructor(props) {
//         super({
//             ...props,
//             events: {
//                 change: (e) =>
//                     props.onChange(e.target.value),
//                 blur: () => this.validate(),
//             },
//             attr: {
//                 class: ``,
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

// class Button extends Block {
//     constructor(props) {
//       super({
//         ...props,
//         events: {
//           click: () => console.log('event')
//         },
//         attr: {
//           class: `fake`
//         }
//       })
//     }

//     render() {
//       return "<button>{{text}}</button>"
//     }
//   }

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

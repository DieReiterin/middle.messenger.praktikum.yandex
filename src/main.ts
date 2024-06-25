import Block from "./tools/Block";

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

class Button extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                click: () => console.log("event"),
            },
            attr: {
                class: `fake`,
            },
        });
    }

    render() {
        return "<button>{{text}}</button>";
    }
}

class Input extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                change: (e: Event) =>
                    props.onChange((e.target as HTMLInputElement).value),
                blur: () => this.validate(),
            },
        });
    }

    render() {
        return `<input />`;
    }

    validate() {
        console.log("Here we call validation code on blur");
    }
}

class PageWithButton extends Block {
    constructor(props) {
        super({
            ...props, //{buttonText: 'Button'}
            button: new Button({ text: props.buttonText }),
            input: new Input({
                label: "input",
                onChange: (value) => {
                    this.setProps({ buttonText: value });
                },
            }),
        });
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }
        return true;
    }

    override render() {
        return "<div>{{{ button }}} {{{ input }}}</div>";
    }
}

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

const block = new PageWithButton({ buttonText: "Button" });
//const block = new PageWithList();
const container = document.getElementById("app")!;
container.append(block.getContent()!);

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

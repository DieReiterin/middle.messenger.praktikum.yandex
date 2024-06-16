import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import * as Layouts from "./layouts";
import './style.scss'

const layouts = {
    'default': [ Layouts.LayoutDefault ],
    'navigated': [ Layouts.LayoutNavigated ],
}

const pages = {
    'chat': [ Pages.ChatPage ],
    'login': [ Pages.LoginPage ],
    'not-found': [ Pages.NotFoundPage ],
    'profile': [ Pages.ProfilePage ],
    'server-error': [ Pages.ServerErrorPage ],
    'signin': [ Pages.SigninPage ],
}

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function setLayout(type) {
    const [ source, args ] = layouts[type];
    const handlebarsFunc = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunc(args);
}

function navigate(page) {
    const [ source, args ] = pages[page];
    const handlebarsFunc = Handlebars.compile(source);

    const content = document.getElementById('layout-content')
    content.innerHTML = handlebarsFunc(args);
}

document.addEventListener('DOMContentLoaded', () => {
    setLayout('navigated');
    navigate('login');
});

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        
        e.preventDefault();
        e.stopImmediatePropagation;
    }
});
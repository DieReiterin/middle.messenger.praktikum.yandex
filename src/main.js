import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import './style.scss'

const pages = {
    'chat': [ Pages.ChatPage ],
    'login': [ Pages.LoginPage ],
}

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page) {
    const [ source, args ] = pages[page];
    const handlebarsFunc = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunc(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        
        e.preventDefault();
        e.stopImmediatePropagation;
    }
});
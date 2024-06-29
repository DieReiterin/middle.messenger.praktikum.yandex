import LayoutNavigated from "../layouts/layout-navigated/LayoutNavigated.ts";

import LoginPage from "../pages/login-page/LoginPage.ts";
import SigninPage from "../pages/signin-page/SigninPage.ts";
import ChatPage from "../pages/chat-page/ChatPage.ts";
import ProfilePage from "../pages/profile-page/ProfilePage.ts";
import NotFoundPage from "../pages/not-found-page/NotFoundPage.ts";

// const pages = {
//         chat: [Pages.ChatPage],
//         login: [Pages.LoginPage],
//         "not-found": [Pages.NotFoundPage],
//         profile: [Pages.ProfilePage],
//         "server-error": [Pages.ServerErrorPage],
//         settings: [Pages.SettingsPage],
//         signin: [Pages.SigninPage],
//     };
function setLayout(type) {
    let newInstance;

    if (type === "default") {
        // newInstance = new LoginPage();
    } else if (type === "navigated") {
        newInstance = new LayoutNavigated();
    } else {
        console.log("no such layout");
    }

    const container = document.getElementById("app")!;
    container.append(newInstance.getContent()!);
}

function setPage(type) {
    let newInstance;

    if (type === "login") {
        newInstance = new LoginPage();
    } else if (type === "signin") {
        newInstance = new SigninPage();
    } else if (type === "chat") {
        newInstance = new ChatPage();
    } else if (type === "profile") {
        newInstance = new ProfilePage();
    } else if (type === "not-found") {
        newInstance = new NotFoundPage();
    } else {
        console.log("no such page");
    }

    const content = document.getElementById("layout-content");
    content.innerHTML = "";

    content.append(newInstance.getContent()!);
}

export default function navigate(pageOrLayout, type) {
    if (pageOrLayout === "layout") {
        setLayout(type);
    } else if (pageOrLayout === "page") {
        setPage(type);
    }
}

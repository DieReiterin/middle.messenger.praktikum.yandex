import LayoutNavigated from "../layouts/layout-navigated/LayoutNavigated.ts";
import LoginPage from "../pages/login-page/LoginPage.ts";
import SigninPage from "../pages/signin-page/SigninPage.ts";
import ChatPage from "../pages/chat-page/ChatPage.ts";
import ProfilePage from "../pages/profile-page/ProfilePage.ts";
import NotFoundPage from "../pages/not-found-page/NotFoundPage.ts";

function setLayout(type) {
    let layout;
    if (type === "navigated") {
        layout = new LayoutNavigated();
    } else {
        throw new Error(`no such layout ${type}`);
    }
    const container = document.getElementById("app")!;
    container.append(layout.getContent()!);
}
function setPage(type) {
    let page;
    if (type === "login") {
        page = new LoginPage();
    } else if (type === "signin") {
        page = new SigninPage();
    } else if (type === "chats") {
        page = new ChatPage();
    } else if (type === "profile") {
        page = new ProfilePage();
    } else if (type === "profile") {
        page = new NotFoundPage();
    } else {
        throw new Error(`no such page ${type}`);
    }
    const content = document.getElementById("layout-content");
    content.innerHTML = "";
    content.append(page.getContent()!);
}

export default function navigate(pageOrLayout, type) {
    if (pageOrLayout === "layout") {
        setLayout(type);
    } else if (pageOrLayout === "page") {
        setPage(type);
    } else {
        throw new Error(
            `incorrect navigation params ${pageOrLayout} and ${type}`
        );
    }
}

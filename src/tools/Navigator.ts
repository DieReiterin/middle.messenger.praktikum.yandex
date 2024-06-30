import EventBus from "./EventBus.ts";
// import LoginPage from "../pages/login-page/LoginPage.ts";
// import SigninPage from "../pages/signin-page/SigninPage.ts";
// import ChatPage from "../pages/chat-page/ChatPage.ts";
// import ProfilePage from "../pages/profile-page/ProfilePage.ts";
// import NotFoundPage from "../pages/not-found-page/NotFoundPage.ts";

// export default const pages = {
//         chat: [Pages.ChatPage],
//         login: [Pages.LoginPage],
//         "not-found": [Pages.NotFoundPage],
//         profile: [Pages.ProfilePage],
//         "server-error": [Pages.ServerErrorPage],
//         settings: [Pages.SettingsPage],
//         signin: [Pages.SigninPage],
//     };

export default class Navigator {
    eventBus: any;
    constructor() {
        this.eventBus = new EventBus();
        this.eventBus.on("navigate", this.navigate());
    }
    navigate() {
        console.log("Navigator");
    }
}

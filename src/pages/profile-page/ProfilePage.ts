import Block from "../../tools/Block.ts";
import { Profile } from "../../components/index.ts";
import "./profile-page.scss";

export default class ProfilePage extends Block {
    constructor(props?) {
        super({
            ...props,
            profile: new Profile({
                className: "profile-page__profile",
                profileType: props.profileType,
            }),
        });
    }
    override render() {
        return `<div class="profile-page">
                    <div class="profile-page__left">
                        <nav class="profile-page__nav">
                            <img src="/icons/arrow.svg" alt="Назад" class="profile-page__nav-btn" page="chats">
                        </nav>
                    </div>
                    <div class="profile-page__main">
                        {{{profile}}}
                    </div>
                </div>`;
    }
}

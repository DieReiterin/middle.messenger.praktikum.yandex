//@ts-nocheck
import Block from "../../tools/Block.ts";
import Profile from "../../components/profile/Profile.ts";
import Button from "../../components/button/Button.ts";
import InputField from "../../components/input-field/InputField.ts";
import "./profile-page.scss";

export default class ProfilePage extends Block {
    constructor(props) {
        const profile = new Profile({
            className: "profile-page__profile",
            children: [
                new Button({
                    text: "Войти",
                    events: {
                        click: () => {
                            profile.updateChild(
                                0,
                                new InputField({ placeholder: "Введите имя" })
                            );
                        },
                    },
                }),
            ],
        });

        super({
            ...props,
            profile: profile,
        });

        // setTimeout(() => {
        //     profile.updateChild(
        //         0,
        //         new InputField({ placeholder: "Введите имя" })
        //     );
        // }, 3000);
    }
    override render() {
        return `<div class="profile-page">
                    <div class="profile-page__left">
                        <nav class="profile-page__nav">
                            <img src="/icons/arrow.svg" alt="Назад" class="profile-page__nav-btn" page="chat">
                        </nav>
                    </div>
                    <div class="profile-page__main">
                        {{{profile}}}
                    </div>
                </div>`;
    }
}

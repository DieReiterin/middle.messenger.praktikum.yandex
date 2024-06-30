import Block from "../../tools/Block.ts";
import Button from "../../components/button/Button.ts";
import InputField from "../../components/input-field/InputField.ts";
import "./profile.scss";

export default class Profile extends Block {
    constructor(props?) {
        super({
            ...props,
            content: new Button({
                text: "Войти",
                events: {
                    click: () => this.replace(),
                },
            }),
        });
    }
    replace() {
        console.log("replace");

        this.content = this.input;
    }
    input = new InputField({
        className: "login-page__input",
        label: "Логин",
        placeholder: "введите логин",
        error: "",
        name: "login",
        id: "login",
    });
    render() {
        return `<div class="profile {{ className }}">
                    <div class="profile__header">
                        <div class="profile__image">
                            <img src="/images/default_profile.png"alt="Ваш аватар" class="profile__image-pic">
                        </div>
                        <span class="profile__title">
                            Иван
                        </span>
                    </div>
                    {{{content}}}
                </div>`;
        // return `<div class="profile {{ className }}">
        //             <div class="profile__header">
        //                 <div class="profile__image">
        //                     <img src="/images/default_profile.png"alt="Ваш аватар" class="profile__image-pic">
        //                 </div>
        //                 <span class="profile__title">
        //                     Иван
        //                 </span>
        //             </div>
        //  {{#each children}}
        //     {{{this}}}
        // {{/each}}
        //         </div>`;
    }
}

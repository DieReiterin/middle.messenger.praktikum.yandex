//@ts-nocheck
import Block from "../../tools/Block.ts";
import "./profile.scss";

export default class Profile extends Block {
    constructor(props?) {
        super(props);
    }
    override render() {
        // return `<div class="profile {{ className }}">
        //             <div class="profile__header">
        //                 <div class="profile__image">
        //                     <img src="/images/default_profile.png"alt="Ваш аватар" class="profile__image-pic">
        //                 </div>
        //                 <span class="profile__title">
        //                     Иван
        //                 </span>
        //             </div>
        //             profile-content/settings-content
        //             {{#each children}}
        //                 {{{this}}}
        //             {{/each}}
        //         </div`;
        return `<div class="profile {{ className }}">
                    <div class="profile__header">
                        <div class="profile__image">
                            <img src="/images/default_profile.png"alt="Ваш аватар" class="profile__image-pic">
                        </div>
                        <span class="profile__title">
                            Иван
                        </span>
                    </div>
                    profile-content/settings-content
                    {{{children}}}
                </div>`;
    }
    updateChild(index, newChild) {
        this.children[index] = newChild;
        this.setProps({ children: this.children });
    }
}

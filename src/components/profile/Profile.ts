import Block from "../../tools/Block.ts";
import { ProfileContent, SettingsContent } from "../../components/index.ts";
import "./profile.scss";

export default class Profile extends Block {
    constructor(props?) {
        super({
            ...props,
            content: "",
        });
    }
    default = new ProfileContent({
        onEdit: () => this.edit(),
    });
    settings = new SettingsContent({
        onSave: () => this.save(),
    });
    edit() {
        this.setProps({ content: this.settings });
    }
    save() {
        this.setProps({ content: this.default });
    }
    componentDidMount() {
        if (this.props.profileType === "settings") {
            this.edit();
        } else {
            this.save();
        }
    }
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

import Block, { IProps } from '@/tools/Block';
import { ProfileContent } from '@/components/index';
import './profile.scss';
// import connect from '@/tools/connect';

export default class Profile extends Block {
    // class Profile extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            content: new ProfileContent(),
        });
    }
    override render() {
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
    }
}
// const connectedProfile = connect(Profile);
// export default connectedProfile;

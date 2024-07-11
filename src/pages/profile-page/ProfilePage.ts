import Block, { IProps } from '@/tools/Block';
import { Profile, IconButton } from '@/components/index';
import './profile-page.scss';
import navigate from '@/tools/navigate';

export default class ProfilePage extends Block {
    constructor(props: IProps = {}) {
        super({
            ...props,
            profile: new Profile({
                className: 'profile-page__profile',
                profileType: props.profileType,
            }),
            backBtn: new IconButton({
                className: 'profile-page__nav-btn',
                src: '/icons/arrow.svg',
                alt: 'Назад',
                onClick: () => navigate('page', 'chats'),
            }),
        });
    }
    override render() {
        return `<div class="profile-page">
                    <div class="profile-page__left">
                        <nav class="profile-page__nav">
                            {{{backBtn}}}
                        </nav>
                    </div>
                    <div class="profile-page__main">
                        {{{profile}}}
                    </div>
                </div>`;
    }
}

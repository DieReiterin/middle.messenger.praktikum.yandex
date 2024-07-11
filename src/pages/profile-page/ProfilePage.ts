import Block, { IProps } from '@/tools/Block';
import { Profile, IconButton } from '@/components/index';
import './profile-page.scss';

export default class ProfilePage extends Block {
    constructor(props: IProps = { profileType: 'default' }) {
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
                onClick: () => window.router.go('/messenger'),
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

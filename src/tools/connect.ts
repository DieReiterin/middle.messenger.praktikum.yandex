import Block from '@/tools/Block';
import store from '@/tools/Store';

type TAction = {
    type: string;
    [key: string]: any;
};

function mapStateToProps(state: any) {
    return {
        user: state.user,
        profile: state.profile,
    };
}

export default function connect(
    Component: typeof Block,
    mapStateToPropsFn = mapStateToProps,
) {
    return class extends Component {
        constructor(...args: any[]) {
            super(...args);

            store.subscribe(() => {
                this.setProps(mapStateToPropsFn(store.getState()));
            });
            this.dispatch = store.dispatch;
        }
        dispatch(action: TAction) {
            store.dispatch(action);
        }
    };
}

import Block from '@/tools/Block';
import store from '@/tools/Store';

type TAction = {
    type: string;
    [key: string]: any;
};

function mapStateToProps(state: any) {
    return {
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
                // this.setProps({ ...store.getState() });
                this.setProps(mapStateToPropsFn(store.getState()));
                // console.log('this.props');
                // console.log(this.props);
            });
            this.dispatch = store.dispatch;
            // console.log(this);
        }
        dispatch(action: TAction) {
            store.dispatch(action);
        }
    };
}

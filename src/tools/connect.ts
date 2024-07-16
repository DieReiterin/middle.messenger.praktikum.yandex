import Block from '@/tools/Block';
import store from '@/tools/Store';

export default function connect(Component: typeof Block) {
    return class extends Component {
        constructor(...args: any[]) {
            super(...args);

            store.subscribe(() => {
                console.log('We are in store subscription by connect');

                this.setProps({ ...store.getState() });
                console.log('this.props');
                console.log(this.props);
            });

            console.log(this);
        }
    };
}

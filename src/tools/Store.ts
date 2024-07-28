type TAction = {
    type: string;
    [key: string]: any;
};
type TReducer<S> = (state: S, action: TAction) => S;
type TSubscriber<S> = (state: S) => void;

interface IStore<S> {
    getState: () => S;
    subscribe: (fn: TSubscriber<S>) => void;
    dispatch: (action: TAction) => void;
}
interface IState {
    [key: string]: any;
}
let state: IState = {
    user: {
        id: '',
        avatar: '',
    },
    profile: {
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
        login: '',
        email: '',
    },
};

// let setTextAction: TAction = {
//     type: 'SET_TEXT',
//     buttonText: '',
// };

const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

const reducer: TReducer<IState> = (state, action) => {
    let newState = deepCopy(state);
    // console.log('state before action', state);
    // console.log('newState before action', newState);

    if (action.type === 'SET_USER_DATA') {
        const {
            id,
            avatar,
            email,
            login,
            first_name,
            second_name,
            display_name,
            phone,
        } = action.data;

        newState.user = {
            id,
            avatar,
        };
        newState.profile = {
            login,
            first_name,
            second_name,
            display_name,
            phone,
            email,
        };
        return newState;
    } else if (action.type === 'SET_PROFILE') {
        const { email, login, first_name, second_name, display_name, phone } =
            action.profile;

        newState.profile = {
            login,
            first_name,
            second_name,
            display_name,
            phone,
            email,
        };
        return newState;
    } else if (action.type === 'SET_AVATAR') {
        newState.user.avatar = action.avatar;
        return newState;
    } else {
        return state;
    }
};

const createStore = <S>(reducer: TReducer<S>, initialState: S): IStore<S> => {
    const subscribers: TSubscriber<S>[] = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: TSubscriber<S>) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: TAction) => {
            currentState = reducer(currentState, action);
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

let store = Object.freeze(createStore(reducer, state));

export default store;

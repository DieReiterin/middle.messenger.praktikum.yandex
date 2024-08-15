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
const state: IState = {
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

const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

const reducer: TReducer<IState> = (stateParam, action) => {
    const newState = deepCopy(stateParam);

    if (action.type === 'SET_USER_DATA') {
        const {
            avatar,
            display_name,
            email,
            first_name,
            id,
            login,
            phone,
            second_name,
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
        return stateParam;
    }
};

const createStore = <S>(
    reducerFunc: TReducer<S>,
    initialState: S,
): IStore<S> => {
    const subscribers: TSubscriber<S>[] = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: TSubscriber<S>) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: TAction) => {
            currentState = reducerFunc(currentState, action);
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

const store = Object.freeze(createStore(reducer, state));

export default store;

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
    buttonText: 'Initial text',
};

// let setTextAction: TAction = {
//     type: 'SET_TEXT',
//     buttonText: '',
// };

const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj));

const reducer: TReducer<IState> = (state, action) => {
    let newState = deepCopy(state);
    if (action.type === 'SET_TEXT') {
        console.log('action.buttonText ' + action.buttonText);
        newState.buttonText = action.buttonText;
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

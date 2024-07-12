type TAction = {
    type: string;
    [key: string]: any;
};

type TReducer<State, Action> = (state: State, action: Action) => State;

type TSubscriber<State> = (state: State) => void;

interface IStore<State, Action> {
    getState: () => State;
    subscribe: (fn: TSubscriber<State>) => void;
    dispatch: (action: Action) => void;
}

const createStore = <State, Action>(
    reducer: TReducer<State, Action>,
    initialState: State,
): Store<State, Action> => {
    const subscribers: TSubscriber<State>[] = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: TSubscriber<State>) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: Action) => {
            currentState = reducer(currentState, action);
            subscribers.forEach((fn) => fn(currentState));
        },
    };
};

const deepCopy = <T>(object: T) => JSON.parse(JSON.stringify(object));

const reducer = (state: State, action: Action): State => {
    let newState = deepCopy(state);
    if (action.type === 'SET_TEXT') {
        console.log('SET_TEXT');
        newState.buttonText = action.buttonText;
        return newState;
    } else {
        return state;
    }
};

let state: State = {
    buttonText: 'Initial text',
};

let setTextAction: Action = {
    type: 'SET_TEXT',
    buttonText: '',
};

let store = Object.freeze(createStore(reducer, state));

export default store;

// import EventBus from '@/tools/EventBus';
// import set from '@/utils/set';

// type Indexed<T = any> = {
//     [key in string]: T;
// };

// export enum StoreEvents {
//     Updated = 'updated',
// }

// class Store extends EventBus {
//     private state: Indexed = {};

//     public getState() {
//         return this.state;
//     }

//     public set(path: string, value: unknown) {
//         set(this.state, path, value);
//     }
// }
// const store = new Store();

// export default store;

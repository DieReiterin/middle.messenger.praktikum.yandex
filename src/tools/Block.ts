import Handlebars from 'handlebars';
import EventBus from '@/tools/EventBus';

interface IEvents {
    [key: string]: EventListener | EventListenerObject;
}
interface IAttributes {
    [key: string]: string;
}
export interface IProps {
    events?: IEvents;
    attr?: IAttributes;
    [key: string]: any;
}
interface IChildren {
    [key: string]: Block;
}
interface ILists {
    [key: string]: Block[];
}

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };
    private _element: HTMLElement | null = null;
    private _id: number = Math.floor(100000 + Math.random() * 900000);
    private eventBus: () => EventBus;

    protected props: IProps;
    protected children: IChildren;
    protected lists: ILists;

    constructor(propsWithChildren: IProps = {}) {
        const eventBus = new EventBus();

        const { props, children, lists } =
            this._getChildrenPropsAndProps(propsWithChildren);

        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = lists;

        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        const { events = {} } = this.props;
        Object.entries(events).forEach(([eventName, eventListener]) => {
            if (this._element) {
                this._element.addEventListener(eventName, eventListener);
            }
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    public init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return false;
        }
        this._render();
        return true;
    }

    protected componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        return Object.keys(oldProps).length + Object.keys(newProps).length > 0;
    }

    private _getChildrenPropsAndProps(propsAndChildren: IProps): {
        children: IChildren;
        props: IProps;
        lists: ILists;
    } {
        const children: IChildren = {};
        const props: IProps = {};
        const lists: ILists = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (
                Array.isArray(value) &&
                value.every((item) => item instanceof Block)
            ) {
                lists[key] = value as Block[];
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    public addAttributes() {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value);
            }
        });
    }

    public setProps = (nextProps: IProps) => {
        if (!nextProps) {
            return;
        }
        const { children, lists } = this._getChildrenPropsAndProps(nextProps);
        this.children = children;

        Object.assign(this.props, nextProps);

        Object.entries(lists).forEach(([key, list]) => {
            this.lists[key] = list;
        });
    };

    public get element(): HTMLElement | null {
        return this._element;
    }

    private _render() {
        const propsAndStubs = { ...this.props };
        const _tmpId = Math.floor(100000 + Math.random() * 900000);

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.keys(this.lists).forEach((key) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement(
            'template',
        ) as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`,
            );
            const childContent = child.getContent();
            if (stub && childContent) {
                stub.replaceWith(childContent);
            }
        });

        Object.values(this.lists).forEach((list) => {
            const listCont = this._createDocumentElement(
                'template',
            ) as HTMLTemplateElement;

            list.forEach((item) => {
                const itemContent = item.getContent();
                if (itemContent) {
                    listCont.content.append(itemContent);
                }
            });

            const stub = fragment.content.querySelector(
                `[data-id="__l_${_tmpId}"]`,
            );
            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement as HTMLElement;
        this._addEvents();
        this.addAttributes();
    }

    protected render(): string {
        return '';
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: IProps): IProps {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            },
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    public show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}

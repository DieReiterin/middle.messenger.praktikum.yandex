import EventBus from "./EventBus.ts";
import Handlebars from "handlebars";

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    };

    _element = null;
    _id = Math.floor(100000 + Math.random() * 900000);
    eventBus = null;
    props = null;
    children = null;
    lists = null;

    constructor(propsWithChildren = {}) {
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

    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        // console.log("Mount");
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            (child as Block).dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps, newProps) {
        return oldProps !== newProps;
    }

    _getChildrenPropsAndProps(propsAndChildren) {
        const children = {};
        const props = {};
        const lists = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    addAttributes() {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    setProps = (nextProps) => {
        if (!nextProps) {
            //
            return;
        }
        const { children, lists } = this._getChildrenPropsAndProps(nextProps);

        Object.assign(this.props, nextProps); //

        Object.entries(children).forEach(([key, child]) => {
            if (this.children[key] && this.children[key] instanceof Block) {
                this.children[key].setProps(child.props);
            } else {
                this.children[key] = child;
            }
        });

        Object.entries(lists).forEach(([key, list]) => {
            this.lists[key] = list;
        });

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    // _render() {
    //     // console.log("Render");
    //     const propsAndStubs = { ...this.props };
    //     const _tmpId = Math.floor(100000 + Math.random() * 900000);
    //     // Генерация заглушек для детей
    //     Object.entries(this.children).forEach(([key, child]) => {
    //         propsAndStubs[key] = `<div data-id="${
    //             (child as Block)._id
    //         }"></div>`;
    //     });
    //     // Генерация заглушек для списков детей
    //     Object.keys(this.lists).forEach((key) => {
    //         propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    //     });

    //     const fragment = this._createDocumentElement("template");
    //     fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    //     Object.values(this.children).forEach((child) => {
    //         const stub = fragment.content.querySelector(
    //             `[data-id="${(child as Block)._id}"]`
    //         );
    //         if (stub) {
    //             stub.replaceWith((child as Block).getContent());
    //         } else {
    //             console.error(`Stub not found for id: ${(child as Block)._id}`);
    //         }
    //     });

    //     // Object.values(this.lists).forEach((child) => {
    //     //     const listCont = this._createDocumentElement("template");
    //     //     if (child instanceof Block) {
    //     //         listCont.content.append(child.getContent());
    //     //     } else {
    //     //         listCont.content.append(`${child}`);
    //     //     }
    //     //     const stub = fragment.content.querySelector(
    //     //         `[data-id="__l_${_tmpId}"]`
    //     //     );
    //     //     stub.replaceWith(listCont.content);
    //     // });

    //     Object.entries(this.lists).forEach(([key, list]) => {
    //         type TList = any[];
    //         const listStub = fragment.content.querySelector(
    //             `[data-id="__l_${_tmpId}"]`
    //         );
    //         if (listStub) {
    //             (list as TList).forEach((item) => {
    //                 if (item instanceof Block) {
    //                     listStub.appendChild((item as Block).getContent());
    //                 } else {
    //                     const textNode = document.createTextNode(item);
    //                     listStub.appendChild(textNode);
    //                 }
    //             });
    //         }
    //     });

    //     const newElement = fragment.content.firstElementChild;
    //     if (this._element) {
    //         this._element.replaceWith(newElement);
    //     }
    //     this._element = newElement;
    //     this._addEvents();
    //     this.addAttributes();
    // }
    _render() {
        const propsAndStubs = { ...this.props };
        const _tmpId = Math.floor(100000 + Math.random() * 900000);

        // Генерация заглушек для детей
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${
                (child as Block)._id
            }"></div>`;
        });

        // Генерация заглушек для списков детей
        Object.keys(this.lists).forEach((key) => {
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        // Создание фрагмента и компиляция шаблона
        const fragment = this._createDocumentElement("template");
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        // Заменяем заглушки на реальные дочерние компоненты
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${(child as Block)._id}"]`
            );
            if (stub) {
                stub.replaceWith((child as Block).getContent());
            } else {
                console.error(`Stub not found for id: ${(child as Block)._id}`);
            }
        });

        // Заменяем заглушки для списков детей на реальные элементы
        Object.entries(this.lists).forEach(([key, list]) => {
            const listStub = fragment.content.querySelector(
                `[data-id="__l_${_tmpId}"]`
            );
            if (listStub) {
                list.forEach((item) => {
                    if (item instanceof Block) {
                        listStub.appendChild((item as Block).getContent());
                    } else {
                        const textNode = document.createTextNode(item);
                        listStub.appendChild(textNode);
                    }
                });
            } else {
                console.error(`List stub not found for id: __l_${_tmpId}`);
            }
        });

        // Замена старого элемента новым
        const newElement = fragment.content.firstElementChild;
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("No access");
            },
        });
    }

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

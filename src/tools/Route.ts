import Block from '@/tools/Block';
import { renderDom } from '@/utils/renderDom';

interface IRouteProps {
    rootQuery: string;
    [key: string]: any;
}

type BlockClass = new () => Block;

const isStringEqual = (str1: string, str2: string): boolean => {
    return str1 === str2;
};

export default class Route {
    private _pathname: string;
    private _blockClass: BlockClass;
    private _block: Block | null;
    private _props: IRouteProps;

    constructor(pathname: string, view: BlockClass, props: IRouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isStringEqual(pathname, this._pathname);
    }

    render(): void {
        // if (!this._block) {
        //     this._block = new this._blockClass();
        //     renderDom(this._props.rootQuery, this._block);
        //     return;
        // }

        // this._block.show();
        if (!this._block) {
            this._block = new this._blockClass();
            renderDom(this._props.rootQuery, this._block);
        } else {
            this._block.show();
        }
    }
}

import Block from '@/tools/Block';
import Route from '@/tools/Route';

type TRoute = Route;

export default class Router {
    private static __instance: Router;
    private routes: TRoute[] = [];
    private history: History = window.history;
    private _currentRoute: TRoute | null = null;
    private _rootQuery: string = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block): this {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });
        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const isAuth = localStorage.getItem('isAuth');
        const publicRoutes = ['/', '/sign-up'];
        const privateRoutes = ['/settings', '/messenger'];

        if (!isAuth && privateRoutes.includes(pathname)) {
            this.go('/');
            return;
        }
        if (isAuth && publicRoutes.includes(pathname)) {
            this.go('/messenger');
            return;
        }

        const route = this.getRoute(pathname);
        if (!route) {
            this.go('/error');
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

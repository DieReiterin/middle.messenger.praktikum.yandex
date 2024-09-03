import Router from '@/tools/Router';
import Block from '@/tools/Block';

class MockBlock extends Block {
    render() {
        return '<div>Mock Block</div>';
    }
}

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router('#app');
    });

    test('should add a route using `use` method', () => {
        router.use('/test', MockBlock);
        const route = router.getRoute('/test');

        expect(route).not.toBeNull();
        expect(route!.match('/test')).toBe(true);
    });

    test('should call _onRoute using `go` method', () => {
        jest.spyOn(router as any, '_onRoute');

        router.use('/test', MockBlock);
        router.go('/test');

        expect((router as any)._onRoute).toHaveBeenCalledWith('/test');
    });

    test('should redirect to "/" if not authenticated and accessing private route', () => {
        localStorage.removeItem('isAuth');

        router.use('/', MockBlock);
        router.use('/settings', MockBlock);

        jest.spyOn(router as any, 'go');

        router.start();
        router.go('/settings');

        expect((router as any).go).toHaveBeenCalledWith('/');
    });

    test('should redirect to "/messenger" if authenticated and accessing public route', () => {
        localStorage.setItem('isAuth', 'true');

        router.use('/', MockBlock);
        router.use('/messenger', MockBlock);

        jest.spyOn(router as any, 'go');

        router.start();
        router.go('/');

        expect((router as any).go).toHaveBeenCalledWith('/messenger');
    });

    test('should handle browser navigation', () => {
        jest.spyOn(router as any, '_onRoute');
        router.use('/home', MockBlock);
        router.use('/about', MockBlock);
        router.start();
        router.go('/home');
        router.go('/about');

        router.back();
        expect((router as any)._onRoute).toHaveBeenCalledWith('/home');

        router.forward();
        expect((router as any)._onRoute).toHaveBeenCalledWith('/about');
    });
});

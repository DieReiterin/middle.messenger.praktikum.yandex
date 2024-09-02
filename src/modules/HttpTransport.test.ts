import { expect, use } from 'chai';
import * as sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import HttpTransport from '@/modules/HttpTransport';

describe('Http Transport test suite', () => {
    use(sinonChai.default);
    const sandbox = createSandbox();
    let http: HttpTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        http = new HttpTransport();
        request = sandbox
            .stub(http, 'request' as keyof typeof http)
            .callsFake(() => Promise.resolve({}));
    });
    afterEach(() => {
        sandbox.restore();
    });

    it('should blabla test case', () => {
        http.get('', { data: { a: '1', b: '2' } });

        expect(request).calledWithMatch('?a=1&b=2', 'GET');
    });
});

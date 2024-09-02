import HttpTransport from '@/modules/HttpTransport';

describe('HttpTransport.queryStringify', () => {
    test('should stringify an object with string params', () => {
        const input = { a: '1', b: '2' };
        const expected = '?a=1&b=2';

        expect(HttpTransport.queryStringify(input)).toBe(expected);
    });

    test('should stringify an object with string an number params', () => {
        const input = { a: 'string', b: 2 };
        const expected = '?a=string&b=2';

        expect(HttpTransport.queryStringify(input)).toBe(expected);
    });

    test('should stringify an object with chars params encoded', () => {
        const input = { a: '1+2', b: '2 2' };
        const expected = '?a=1%2B2&b=2%202';

        expect(HttpTransport.queryStringify(input)).toBe(expected);
    });

    test('should stringify an object with spec chars parameter encoded', () => {
        const input = { a: '1=2&1' };
        const expected = '?a=1%3D2%261';

        expect(HttpTransport.queryStringify(input)).toBe(expected);
    });

    test('should transform spec chars in params', () => {
        const input = { 'a=x&4': 'q=w&e' };
        const expected = '?a%3Dx%264=q%3Dw%26e';

        expect(HttpTransport.queryStringify(input)).toBe(expected);
    });
});

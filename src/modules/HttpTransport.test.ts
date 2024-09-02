import HttpTransport from '@/modules/HttpTransport';

describe('HttpTransport.queryStringify (test suite)', () => {
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

// describe('Http Transport (test suite)', () => {
//     let http: HttpTransport;
//     let request: jest.SpyInstance;

//     beforeEach(() => {
//         http = new HttpTransport();
//         request = jest
//             .spyOn(http, 'request')
//             .mockResolvedValue({} as XMLHttpRequest);
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     test('should stringify query object for GET request where all parameters are strings (test case)', () => {
//         http.get('', { data: { a: '1', b: '2' } });

//         expect(request).toHaveBeenCalledWith('?a=1&b=2', 'GET');
//     });

//     // test('should stringify query object for GET request where parameters are string and number (test case)', () => {
//     //     http.get('', { data: { a: 'string', b: 2 } });

//     //     expect(request).toHaveBeenCalledWith('?a=string&b=2', 'GET');
//     // });

//     // test('should encode chars for query (test case)', () => {
//     //     http.get('', { data: { a: '1+2', b: '2 2' } });

//     //     expect(request).toHaveBeenCalledWith('?a=1%2B2&b=2%202', 'GET');
//     // });

//     // test('should encode special chars for query (test case)', () => {
//     //     http.get('', { data: { a: '1=2&1' } });

//     //     expect(request).toHaveBeenCalledWith('?a=1%3D2%261', 'GET');
//     // });

//     // test('should encode special chars in parameter for GET query (test case)', () => {
//     //     http.get('', { data: { 'a=x&4': 'q=w&e' } });

//     //     expect(request).toHaveBeenCalledWith('?a%3Dx%264=q%3Dw%26e', 'GET');
//     // });
// });

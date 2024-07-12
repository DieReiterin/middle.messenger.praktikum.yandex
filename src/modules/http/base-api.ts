export class BaseAPI {
    create() {
        throw new Error('Not implemented');
    }

    request(params?: Record<string, any> | string): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update() {
        throw new Error('Not implemented');
    }

    delete() {
        throw new Error('Not implemented');
    }
}

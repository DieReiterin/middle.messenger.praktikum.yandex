type TEventHandler = (...args: any[]) => void;

export default class EventBus {
    private listeners: { [key: string]: TEventHandler[] };

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: TEventHandler): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: TEventHandler): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: string, ...args: any[]): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}

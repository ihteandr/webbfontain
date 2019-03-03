// @flow
export class EventEmitter {
    listeners: Object = {};

    on(event: string, listener: (any) => *) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    off(event?: string, listener?: (any) => *) {
        if (listener && event && this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(
                eListener => eListener !== listener
            );
        } else if (event) {
            this.listeners[event] = [];
        } else {
            this.listeners = {};
        }
    }

    emit(event: string, data: any | null = null) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        }
    }
}

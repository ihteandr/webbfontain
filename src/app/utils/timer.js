// @flow
import { EventEmitter } from './event-emitter';

export class Timer extends EventEmitter {
    timer: number;

    time: number;

    interval: IntervalID;

    constructor(time: number) {
        super();
        this.time = time;
        this.timer = time;
    }

    changeTimer(timer: number) {
        this.timer = timer;
        this.tick();
    }

    alarm() {
        this.emit('alarm');
    }

    tick() {
        let time = this.timer / 1000;
        if (time < 1) {
            time = 0;
        }
        this.emit('tick', Math.ceil(time));
    }

    start() {
        this.interval = setInterval(() => {
            if (this.timer <= 1000) {
                this.tick();
                this.alarm();
                this.stop();
            } else {
                this.timer -= 1000;
                this.tick();
            }
        }, 1000);
    }

    reset() {
        this.timer = this.time;
        this.stop();
        this.start();
    }

    stop() {
        clearInterval(this.interval);
        this.off();
    }
}
